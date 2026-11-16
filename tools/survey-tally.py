# 설문 응답 CSV를 경로별(뉴비 본 사람 / 안 본 사람 / 고인물 / 관심 없음)로 집계한다.
# 쓰는 법: python -I tools/survey-tally.py "<응답 CSV 경로>"   (원본 CSV는 레포에 두지 않는다)
import csv, sys, io, re
from collections import Counter
rows=list(csv.reader(io.open(sys.argv[1],encoding='utf-8-sig')))
h=rows[0]; data=rows[1:]
print("총 응답", len(data))
def known_opts(col):
    # known option strings: gather from whole column, splitting by option pattern
    return None
LEARN=['경기를 직접 보면서 익힌다','검색해서 찾아본다 (포털, 나무위키 등)','유튜브 같은 영상으로 본다 (입문 영상, 하이라이트 등)','ChatGPT 같은 AI에게 묻는다','야구를 잘 아는 친구·가족에게 묻는다','야구 커뮤니티에 묻거나 글을 읽는다','따로 알아보지 않는다 / 아직 알아본 적 없다']
STUCK=['경기 규칙 (아웃, 진루, 파울 등)','야구 용어 (병살, 볼넷, 희생번트 등)','숫자·기록 (전광판의 타율, 방어율 등)','경기 흐름 (몇 회까지 하는지, 왜 투수를 바꾸는지 등)','팀·선수 (누가 잘하는지, 지금 순위 등)','응원 문화 (응원가, 응원석, 홈·원정 등)']
REGRET=['설명에 또 모르는 용어가 나왔다','뭐라고 검색해야 할지 몰랐다','설명이 너무 길거나 많았다','맞는 정보인지 알 수 없었다','물어보기가 미안하거나 귀찮았다','특정 팀 이야기로 치우쳤다','특별히 없었다']
KEEP=['응원 분위기','마음에 드는 팀이나 선수가 생겼다','같이 보는 사람','경기를 이해하게 되면서 재미있어졌다','먹거리·나들이 같은 야구장 경험','특별히 없다']
COOL=['무슨 상황인지 몰라서','경기가 너무 길어서','같이 볼 사람이 없어서','응원할 팀이 없어서','표를 구하기 어려워서','특별히 없다']
def multi(cell,opts):
    found=[o for o in opts if o in cell]
    rest=cell
    for o in found: rest=rest.replace(o,'')
    rest=re.sub(r'^[,\s]+|[,\s]+$','',re.sub(r'(,\s*)+',', ',rest))
    return found,rest
def group(name,rs):
    print(f"\n== {name} (n={len(rs)})")
    return rs
lvl=lambda r:r[1][:1]
vet=[r for r in data if lvl(r) in '45']
non=[r for r in data if lvl(r) in '123']
nointerest=[r for r in non if r[2]=='없다']
newb=[r for r in non if r[2]!='없다']
seen=[r for r in newb if r[3] and r[3]!='아직 본 적 없다']
notseen=[r for r in newb if r[3]=='아직 본 적 없다']
print("고인물",len(vet),"관심없음",len(nointerest),"뉴비",len(newb),"본사람",len(seen),"안본사람",len(notseen))
def single(rs,i,title):
    print(f"-- {title}"); 
    for k,v in Counter(r[i] for r in rs).most_common(): print(f"   {v}  {k}")
def mc(rs,i,opts,title):
    c=Counter(); others=[]
    for r in rs:
        f,rest=multi(r[i],opts); c.update(f)
        if rest: others.append(rest)
    print(f"-- {title}")
    for o in opts: print(f"   {c[o]}  {o}")
    for o in others: print(f"   기타: {o}")
group("뉴비(본 사람)",seen)
single(seen,1,"A2 아는 정도"); single(seen,2,"A1-1 관심"); single(seen,3,"A1 본 방식")
mc(seen,4,LEARN,"A3 알아가는 방법"); single(seen,5,"B1 본 지"); single(seen,6,"B2 누구와")
mc(seen,7,STUCK,"B3 막힌 곳"); mc(seen,8,REGRET,"B4 아쉬운 점"); mc(seen,9,KEEP,"B5 계속 보게"); mc(seen,10,COOL,"B6 식은 순간")
group("고인물",vet)
single(vet,1,"A2")
mc(vet,14,STUCK,"G1 막힌 곳"); mc(vet,15,LEARN,"G2 알아간 방법"); mc(vet,16,KEEP,"G3 계속 보게"); mc(vet,17,STUCK,"G4 먼저 알면 좋은 것")
print("\n== D1 서술")
for r in data:
    if r[18].strip(): print(f"[{r[1][:1]}] {r[18]!r}")
