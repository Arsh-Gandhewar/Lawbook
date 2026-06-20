import sys
import pandas as pd
import urllib.request
import io
import json

def fetch_and_print_parquet(url, limit=None):
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    try:
        with urllib.request.urlopen(req) as response:
            content = response.read()
            df = pd.read_parquet(io.BytesIO(content))
            
            # Convert datetime columns to strings for JSON serialization
            for col in df.select_dtypes(include=['datetime64', 'datetimetz']).columns:
                df[col] = df[col].astype(str)
                
            # Replace NaNs with None so JSON serialization uses null
            df = df.where(pd.notnull(df), None)
            
            # --- Heuristic to pick the 'top' cases ---
            # 1. Drop records where description contains office notes
            if 'description' in df.columns:
                df = df[~df['description'].str.contains('Office Notes|FARAD CONTINUATION SHEET', case=False, na=False)]
            # 2. Drop records where it was dismissed for default/withdrawn
            if 'disposal_nature' in df.columns:
                df = df[~df['disposal_nature'].str.contains('Withdrawn|Default|Settled', case=False, na=False)]
            # 3. Sort by description length (longer = more substantive reasoning)
            if 'description' in df.columns:
                df['desc_len'] = df['description'].str.len().fillna(0)
                df = df.sort_values(by='desc_len', ascending=False)
                df = df.drop(columns=['desc_len'])
            
            if limit and limit > 0:
                df = df.head(limit)
                
            records = df.to_dict(orient='records')
            # Print as a single JSON array string to stdout
            print(json.dumps(records))
    except Exception as e:
        print(json.dumps({"error": str(e)}))
        sys.exit(1)

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print(json.dumps({"error": "No URL provided"}))
        sys.exit(1)
        
    url = sys.argv[1]
    limit = int(sys.argv[2]) if len(sys.argv) > 2 else None
    
    fetch_and_print_parquet(url, limit)
