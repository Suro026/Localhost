"""Subject/topic per question for GATE 2009 CS (60 questions, no General Aptitude section), keyed by the paper's own number."""
from tags_2016 import GA, D, LA, CA, PS, DL, CO, PD, AL, TC, CD, OS, DB, CN

CS = {
    1: (D, "Group Theory"), 2: (D, "Graph Coloring"), 3: (D, "Graph Theory"), 4: (D, "Relations"), 5: (CO, "Number Representation"),
    6: (DL, "Boolean Functions"), 7: (CO, "Memory Chips"), 8: (CO, "Interrupts"), 9: (OS, "Page Replacement"), 10: (OS, "Page Tables"),
    11: (AL, "Sorting"), 12: (TC, "Context-Free Grammars"), 13: (AL, "Shortest Paths"), 14: (AL, "NP-Completeness"),
    15: (TC, "Regular Expressions"), 16: (TC, "Language Classes"), 17: (CD, "Compiler Phases"), 18: (PD, "Recursion"),
    19: (PD, "Software Engineering: Coupling"), 20: (CN, "HTML"), 21: (PS, "Conditional Probability"), 22: (D, "Group Theory"),
    23: (D, "Predicate Logic"), 24: (D, "Propositional Logic"), 25: (CA, "Definite Integrals"), 26: (D, "Predicate Logic"),
    27: (DL, "Finite State Machines"), 28: (CO, "Pipelining"), 29: (CO, "Cache Memory"), 30: (OS, "Deadlock"),
    31: (OS, "Disk Scheduling"), 32: (OS, "Process States"), 33: (OS, "Critical Section"), 34: (OS, "Paging"),
    35: (AL, "Recurrence Relations"), 36: (PD, "Hashing"), 37: (PD, "AVL Trees"), 38: (AL, "Minimum Spanning Trees"),
    39: (AL, "Quick Sort"), 40: (TC, "Language Classes"), 41: (TC, "DFA"), 42: (CD, "Parsing and Code Optimization"),
    43: (DB, "Serializability"), 44: (DB, "B+ Trees"), 45: (DB, "Relational Algebra and Calculus"), 46: (CN, "Cryptography"),
    47: (CN, "TCP"), 48: (CN, "CRC"), 49: (PD, "Software Engineering: Data Flow Diagrams"),
    50: (PD, "Software Engineering: Cyclomatic Complexity"), 51: (OS, "Disk Addressing"), 52: (OS, "Disk Addressing"),
    53: (AL, "Dynamic Programming"), 54: (AL, "Dynamic Programming"), 55: (DB, "SQL"), 56: (DB, "Normal Forms"),
    57: (CN, "Sliding Window Protocol"), 58: (CN, "Sliding Window Protocol"), 59: (PD, "Heaps"), 60: (PD, "Heaps"),
}
