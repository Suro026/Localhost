"""Subject/topic per question for GATE 2008 CS (85 questions, no General Aptitude section), keyed by the paper's own number."""
from tags_2016 import GA, D, LA, CA, PS, DL, CO, PD, AL, TC, CD, OS, DB, CN

CS = {
    1: (CA, "Limits"), 2: (D, "Set Theory"), 3: (LA, "Systems of Linear Equations"), 4: (CO, "Floating Point Representation"),
    5: (DL, "Karnaugh Maps"), 6: (CO, "Number Systems"), 7: (AL, "Graph Traversal"), 8: (DL, "Combinational Circuits"),
    9: (TC, "Language Classes"), 10: (TC, "Decidability"), 11: (CD, "LR Parsing"), 12: (CD, "Code Optimization"),
    13: (TC, "Recursive and Recursively Enumerable Languages"), 14: (CN, "TCP"), 15: (DB, "Relational Calculus"),
    16: (DB, "Indexing"), 17: (CN, "Sockets"), 18: (PD, "Expressions in C"), 19: (AL, "Graph Traversal"), 20: (OS, "File Systems"),
    21: (CA, "Numerical Integration"), 22: (CA, "Newton-Raphson Method"), 23: (D, "Planar Graphs"), 24: (D, "Summations"),
    25: (CA, "Maxima and Minima"), 26: (DL, "Boolean Algebra"), 27: (PS, "Conditional Probability"), 28: (LA, "Eigenvalues"),
    29: (PS, "Normal Distribution"), 30: (D, "Predicate Logic"), 31: (D, "Propositional Logic"), 32: (OS, "Disk Scheduling"),
    33: (CO, "Addressing Modes"), 34: (CO, "Interrupts"), 35: (CO, "Cache Memory"), 36: (CO, "Pipelining"),
    37: (CO, "Register Windows"), 38: (CO, "Pipelining and TLB"), 39: (AL, "Asymptotic Notation"), 40: (AL, "Searching"),
    41: (PD, "B-Trees"), 42: (D, "Graph Theory"), 43: (AL, "Quick Sort"), 44: (AL, "NP-Completeness"),
    45: (AL, "Shortest Paths"), 46: (PD, "Binary Search Trees"), 47: (PD, "Heaps"), 48: (TC, "Language Classes"),
    49: (TC, "Product Automata"), 50: (TC, "Context-Free Grammars"), 51: (TC, "Language Classes"),
    52: (TC, "NFA and Regular Expressions"), 53: (TC, "Regular Languages"), 54: (CD, "Runtime Environments"),
    55: (CD, "LALR Parsing"), 56: (CN, "TCP Congestion Control"), 57: (CN, "Subnetting"), 58: (CN, "Token Bucket"),
    59: (CN, "Sockets"), 60: (PD, "Pointers in C"), 61: (PD, "Recursion"), 62: (PD, "Linked Lists"), 63: (OS, "Semaphores"),
    64: (OS, "I/O"), 65: (OS, "Deadlock"), 66: (OS, "Process Creation"), 67: (OS, "Paging"), 68: (DB, "Relational Algebra"),
    69: (DB, "Normal Forms"), 70: (DB, "Indexing"), 71: (CO, "Cache Memory"), 72: (CO, "Cache Memory"), 73: (CO, "Cache Memory"),
    74: (AL, "Recurrence Relations"), 75: (PD, "Recursion"), 76: (CO, "Pipelining"), 77: (CO, "Pipelining"),
    78: (AL, "Recurrence Relations"), 79: (AL, "Recurrence Relations"), 80: (AL, "Dynamic Programming"),
    81: (AL, "Dynamic Programming"), 82: (DB, "ER Diagrams"), 83: (DB, "ER Diagrams"), 84: (AL, "Binary Search"),
    85: (AL, "Binary Search"),
}
