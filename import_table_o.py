"""Extract calendar-year values from DCCEEW Table O. Run with the official workbook path."""
import sys,json,pathlib,pandas as pd
root=pathlib.Path(__file__).parent
src=sys.argv[1] if len(sys.argv)>1 else '../upload/table-o-electricity-generation-by-fuel type-2024-25-and-2025.xlsx'
book=pd.ExcelFile(src)
regions=['AUS','NSW','VIC','QLD','WA','SA','TAS','NT']
records=[]
for region in regions:
 df=pd.read_excel(book,sheet_name=f'{region} CY',header=None)
 for c in range(1,df.shape[1]):
  label=str(df.iat[4,c]);year=int(label[:4]) if label[:4].isdigit() else None
  if year is None:continue
  for r in range(5,len(df)):
   fuel=str(df.iat[r,0]);value=df.iat[r,c]
   if pd.notna(value) and isinstance(value,(int,float)) and not fuel.startswith('[') and not fuel.startswith('Of which'):
    records.append({'region':region,'year':year,'fuel':fuel.split(' [')[0],'gwh':round(float(value),3)})
(root/'data'/'generation-cy.json').write_text(json.dumps(records,separators=(',',':')))
idx={(r['region'],r['year'],r['fuel']):r['gwh'] for r in records}
state=[]
coords={'NSW':[147,-32.2],'VIC':[144.5,-37.2],'QLD':[145,-21.8],'WA':[121,-26],'SA':[135,-31],'TAS':[146.6,-42.1],'NT':[133,-20]}
names={'NSW':'New South Wales','VIC':'Victoria','QLD':'Queensland','WA':'Western Australia','SA':'South Australia','TAS':'Tasmania','NT':'Northern Territory'}
for code in regions[1:]:
 for year in range(2015,2026):
  total=idx.get((code,year,'Total'));ren=idx.get((code,year,'Total renewable'))
  if total and ren is not None:
   state.append({'region':code,'state':names[code],'year':year,'total_gwh':total,'renewable_gwh':ren,'fossil_gwh':round(total-ren,3),'share':round(100*ren/total,2),'lon':coords[code][0],'lat':coords[code][1]})
(root/'data'/'state-series.json').write_text(json.dumps(state,separators=(',',':')))
# Cross-check latest workbook state summary, for full-source consistency.
summary=pd.read_excel(book,sheet_name='State summary 2025',header=None)
for code in regions[1:]:
 c=regions.index(code)
 actual=next(x for x in state if x['region']==code and x['year']==2025)
 assert abs(actual['total_gwh']-float(summary.iat[16,c]))<0.01,(code,actual['total_gwh'],summary.iat[16,c])
print('Imported',len(records),'generation rows and',len(state),'state-years; 2025 state totals reconcile.')
