import sys, os
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from cs1_2021_p1 import OV1, META1, PG1, FIG1
from cs1_2021_p2 import OV2, META2, PG2, FIG2
from cs1_2021_p3 import OV3, META3, PG3, FIG3
from cs1_2021_p4 import OV4, META4, PG4, FIG4
from cs1_2021_p5 import OV5, META5, PG5, FIG5

OV = {**OV1, **OV2, **OV3, **OV4, **OV5}
META = {**META1, **META2, **META3, **META4, **META5}
PG = {**PG1, **PG2, **PG3, **PG4, **PG5}
FIG = {**FIG1, **FIG2, **FIG3, **FIG4, **FIG5}
