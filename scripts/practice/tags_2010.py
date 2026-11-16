"""Subject/topic per question for GATE 2010 CS, keyed by the paper's own number (CS Q.1-55, General Aptitude Q.56-65)."""
from tags_2016 import GA, D, LA, CA, PS, DL, CO, PD, AL, TC, CD, OS, DB, CN

CS = {
    1: (D, "Trees"), 2: (CA, "Newton-Raphson Method"), 3: (D, "Relations"), 4: (D, "Group Theory"), 5: (CA, "Limits"),
    6: (DL, "Minterms"), 7: (CO, "DRAM Refresh"), 8: (CO, "Number Representation"), 9: (DL, "Multiplexers"),
    10: (D, "Binary Trees"), 11: (PD, "Pointers in C"), 12: (AL, "Asymptotic Notation"), 13: (CD, "Symbol Table"),
    14: (CD, "Runtime Environment"), 15: (CN, "IP Datagram"), 16: (CN, "Client-Server Applications"),
    17: (TC, "Decidability"), 18: (DB, "B+ Trees"), 19: (DB, "SQL"), 20: (DB, "Concurrency Control"),
    21: (PD, "Software Engineering: Cyclomatic Complexity"), 22: (PD, "Software Engineering: Life Cycle"),
    23: (OS, "Critical Section"), 24: (OS, "Page Replacement"), 25: (OS, "CPU Scheduling"),
    26: (PS, "Conditional Probability"), 27: (PS, "Probability"), 28: (D, "Degree Sequence"), 29: (LA, "Eigenvalues"),
    30: (D, "Predicate Logic"), 31: (DL, "Logic Gates"), 32: (DL, "Counters"), 33: (CO, "Pipelining"),
    34: (AL, "Dynamic Programming"), 35: (PD, "Recursion"), 36: (PD, "Linked Lists"), 37: (CD, "Register Allocation"),
    38: (CD, "LL and LR Parsing"), 39: (TC, "Regular Expressions"), 40: (TC, "Language Classes"), 41: (TC, "NFA"),
    42: (DB, "Serializability"), 43: (DB, "Natural Join"), 44: (PD, "Software Testing"), 45: (OS, "Semaphores"),
    46: (OS, "Deadlock"), 47: (CN, "IP Addressing"), 48: (CO, "Cache Memory"), 49: (CO, "Cache Memory"),
    50: (AL, "Minimum Spanning Trees"), 51: (AL, "Shortest Paths"), 52: (PD, "Hashing"), 53: (PD, "Hashing"),
    54: (CN, "Distance Vector Routing"), 55: (CN, "Distance Vector Routing"),
    56: (GA, "Verbal Ability"), 57: (GA, "Verbal Ability: Vocabulary"), 58: (GA, "Verbal Ability"),
    59: (GA, "Numerical Ability: Sets"), 60: (GA, "Verbal Ability: Analogies"), 61: (GA, "Numerical Ability"),
    62: (GA, "Verbal Reasoning: Logical Deduction"), 63: (GA, "Verbal Reasoning: Comprehension"),
    64: (GA, "Numerical Ability: Time and Work"), 65: (GA, "Numerical Ability: Counting"),
}
