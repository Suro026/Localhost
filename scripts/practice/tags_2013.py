"""Subject/topic per question for GATE 2013 CS, keyed by the paper's own number (CS Q.1-55, General Aptitude Q.56-65)."""
from tags_2016 import GA, D, LA, CA, PS, DL, CO, PD, AL, TC, CD, OS, DB, CN

CS = {
    1: (D, "Algebraic Structures"), 2: (PS, "Poisson Distribution"), 3: (LA, "Determinants"), 4: (DL, "Number Representation"),
    5: (DL, "Combinational Circuits"), 6: (AL, "Sorting: Selection Sort"), 7: (PD, "Binary Search Trees"),
    8: (TC, "Regular Languages"), 9: (CD, "Bottom-up Parsing"), 10: (OS, "CPU Scheduling"), 11: (DB, "XML and Web Services"),
    12: (CN, "Transport Layer Protocols"), 13: (CN, "Network Security: Public Key"), 14: (CN, "Network Layer"),
    15: (DB, "Indexing"), 16: (OS, "Deadlock and Synchronization"), 17: (TC, "Turing Machines"),
    18: (AL, "Complexity Classes: P and NP"), 19: (AL, "Shortest Paths: Bellman-Ford"), 20: (CO, "Cache Memory"),
    21: (DL, "Boolean Algebra"), 22: (CA, "Continuity"), 23: (CA, "Numerical Integration"), 24: (PS, "Probability on Random Graphs"),
    25: (D, "Graph Theory"), 26: (D, "Graph Theory: Line Graphs"), 27: (D, "Predicate Logic"),
    28: (CO, "Micro-operations"), 29: (CO, "Disk Storage"), 30: (AL, "Heap Sort"), 31: (AL, "Time Complexity: Loops"),
    32: (TC, "Context-Free Languages"), 33: (TC, "Finite Automata"), 34: (OS, "Process Synchronization"),
    35: (DB, "Relational Algebra and SQL"), 36: (CN, "Ethernet"), 37: (CN, "IPv4 Fragmentation"),
    38: (PD, "Modules and Coupling"), 39: (CD, "Code Optimization"), 40: (CD, "LR Parsing: LALR"),
    41: (TC, "Decidability"), 42: (PD, "Parameter Passing"), 43: (PD, "Binary Search Tree Traversal"),
    44: (AL, "Amortized Analysis"), 45: (CO, "Pipelining"), 46: (CO, "Memory Organization"), 47: (D, "Predicate Logic"),
    48: (CD, "Register Allocation"), 49: (CD, "Register Allocation"), 50: (PD, "Program Testing"), 51: (PD, "Program Testing"),
    52: (OS, "Virtual Memory: Paging"), 53: (CO, "Cache: Page Coloring"), 54: (DB, "Candidate Keys"), 55: (DB, "Normal Forms"),
    56: (GA, "Verbal Ability: Vocabulary"), 57: (GA, "Verbal Ability: Analogies"), 58: (GA, "Numerical Ability: Series"),
    59: (GA, "Verbal Ability: Grammar"), 60: (GA, "Verbal Ability: Grammar"), 61: (GA, "Numerical Ability: Series"),
    62: (GA, "Numerical Ability: Probability"), 63: (GA, "Verbal Ability: Reading Comprehension"),
    64: (GA, "Numerical Ability: Speed and Distance"), 65: (GA, "Numerical Ability: Percentages"),
}
