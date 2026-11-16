"""Subject/topic per question for GATE 2014 CS (set 1), keyed by our number: 1-10 General Aptitude, 11-65 CS (paper Q.1-55)."""
from tags_2016 import GA, D, LA, CA, PS, DL, CO, PD, AL, TC, CD, OS, DB, CN

CS = {n: (GA, "Verbal Ability") for n in (1, 2, 3, 6, 7)}
CS.update({n: (GA, "Numerical Ability") for n in (4, 5, 8, 9, 10)})
CS.update({
    11: (D, "Predicate Logic"), 12: (PS, "Expectation"), 13: (D, "Graph Theory: Strongly Connected Components"),
    14: (LA, "Systems of Linear Equations"), 15: (LA, "Eigenvectors"), 16: (CA, "Determinants and Derivatives"),
    17: (DL, "Boolean Minimization"), 18: (DL, "Number Systems"), 19: (CO, "Instruction Formats"), 20: (PD, "Pointers in C"),
    21: (AL, "Graph Traversal: DFS"), 22: (PD, "Binary Trees"), 23: (AL, "Graph Traversal"), 24: (AL, "Sorting: Quicksort"),
    25: (TC, "Language Classes"), 26: (TC, "Finite Automata"), 27: (CD, "Basic Blocks and Optimization"),
    28: (PD, "Software Engineering: Process Models"), 29: (OS, "Disk Scheduling"), 30: (OS, "Threads"),
    31: (DB, "Functional Dependencies"), 32: (DB, "Keys and Constraints"), 33: (CN, "Routing Protocols"),
    34: (CN, "Network Security: Message Digest"), 35: (CN, "Application Layer: Web and TLS"), 36: (CN, "Token Ring"),
    37: (CN, "TCP Congestion Control"), 38: (CN, "Sliding Window Protocols"), 39: (DB, "Transactions and Schedules"),
    40: (DB, "Normal Forms"), 41: (OS, "Deadlock: Banker's Algorithm"), 42: (OS, "CPU Scheduling"), 43: (OS, "Page Replacement"),
    44: (CD, "LR Parsing"), 45: (TC, "Closure Properties"), 46: (TC, "Regular Expressions and DFA"),
    47: (AL, "Problem Solving: Weighing"), 48: (AL, "Complexity Classes: P and NP"), 49: (AL, "Selection: Min and Max"),
    50: (PD, "Hashing"), 51: (PD, "Recursion in C"), 52: (AL, "Time Complexity"), 53: (CO, "Pipelining"),
    54: (CO, "Cache Memory"), 55: (DL, "Multiplexers"), 56: (CA, "Differential Equations"), 57: (CA, "Mean Value Theorem"),
    58: (PS, "Dice Probability"), 59: (D, "Recurrence Relations"), 60: (D, "Counting: Functions"), 61: (D, "Graph Theory"),
    62: (D, "Graph Theory: Degree Sequences"), 63: (D, "Propositional Logic"), 64: (DB, "SQL"), 65: (CO, "Performance: CPI"),
})
