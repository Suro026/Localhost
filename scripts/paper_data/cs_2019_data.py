import sys, os
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from cs_2019_p1 import OV1, META1
from cs_2019_p2 import OV2, META2
from cs_2019_p3 import OV3, META3

OV = {**OV1, **OV2, **OV3}
META = {**META1, **META2, **META3}
FIG = {7:(2,("rect",115,150,410,348)), 10:(3,("rect",95,128,525,578)), 12:(4,("rect",228,246,420,330)),
       40:(10,("rect",190,398,390,478)), 65:(16,("rect",118,350,470,472))}
