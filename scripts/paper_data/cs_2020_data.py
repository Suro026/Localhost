import sys, os
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from cs_2020_p1 import OV1, META1
from cs_2020_p2 import OV2, META2

OV = {**OV1, **OV2}
META = {**META1, **META2}
FIG = {5:(2,("rect",148,52,430,222)), 8:(2,("rect",190,640,380,815)), 10:(3,("rect",93,252,478,470)),
       14:(4,("rect",93,428,440,578)), 23:(7,("rect",93,42,440,230)), 38:(10,("rect",118,38,418,166)),
       47:(12,("stack",(93,389,440,458),(93,514,405,690)))}
