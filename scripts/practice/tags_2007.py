"""Subject/topic per question for GATE 2007 CS (85 questions, no General Aptitude section), keyed by the paper's own number."""
from tags_2016 import GA, D, LA, CA, PS, DL, CO, PD, AL, TC, CD, OS, DB, CN

CS = {
    1: (CA, "Continuity and Differentiability"), 2: (D, "Relations"), 3: (DL, "Boolean Algebra"), 4: (D, "Graph Theory"),
    5: (AL, "Topological Sorting"), 6: (TC, "Decidability"), 7: (TC, "Regular Languages"), 8: (DL, "Decoders"),
    9: (DL, "Boolean Functions"), 10: (CO, "Cache Memory"), 11: (OS, "Disks"), 12: (PD, "Binary Trees"), 13: (PD, "Binary Trees"),
    14: (AL, "Sorting"), 15: (AL, "Time Complexity"), 16: (OS, "CPU Scheduling"), 17: (OS, "Threads"), 18: (CD, "Parsing"),
    19: (CN, "Ethernet"), 20: (CN, "Application Layer Protocols"), 21: (D, "Group Theory"), 22: (D, "Predicate Logic"),
    23: (D, "Graph Theory"), 24: (PS, "Probability"), 25: (LA, "Eigenvalues"), 26: (D, "Posets"), 27: (LA, "Vector Spaces"),
    28: (CA, "Newton-Raphson Method"), 29: (TC, "DFA"), 30: (TC, "Language Classes"), 31: (TC, "Regular Languages"),
    32: (DL, "Boolean Minimization"), 33: (DL, "Boolean Algebra"), 34: (DL, "Multiplexers"), 35: (DL, "Look-Ahead Carry Generators"),
    36: (DL, "Counters"), 37: (CO, "Pipelining"), 38: (PD, "Stacks"), 39: (PD, "Binary Tree Traversals"), 40: (PD, "Hashing"),
    41: (AL, "Shortest Paths"), 42: (PD, "Recursion"), 43: (PD, "Trees"), 44: (PD, "Recursion"), 45: (AL, "Recurrence Relations"),
    46: (PD, "Binary Trees"), 47: (PD, "Heaps"), 48: (D, "Propositional Logic"), 49: (AL, "Minimum Spanning Trees"),
    50: (AL, "Selection"), 51: (AL, "Asymptotic Notation"), 52: (CD, "LL(1) Parsing"), 53: (CD, "Parsing"),
    54: (CD, "Code Generation"), 55: (OS, "CPU Scheduling"), 56: (OS, "Page Replacement"), 57: (OS, "Deadlock"),
    58: (OS, "Critical Section"), 59: (DB, "Relational Algebra"), 60: (DB, "Tuple Relational Calculus"), 61: (DB, "SQL"),
    62: (DB, "Normal Forms"), 63: (DB, "B+ Trees"), 64: (DB, "Serializability"), 65: (CN, "Medium Access Control"),
    66: (CN, "Token Ring"), 67: (CN, "Subnetting"), 68: (CN, "CRC"), 69: (CN, "Sliding Window Protocol"),
    70: (CN, "Network Layers"), 71: (CO, "Assembly Programs"), 72: (CO, "Assembly Programs"), 73: (CO, "Interrupts"),
    74: (TC, "Regular Expressions"), 75: (TC, "DFA Minimization"), 76: (AL, "Huffman Coding"), 77: (AL, "Huffman Coding"),
    78: (TC, "Context-Free Grammars"), 79: (TC, "Context-Free Grammars"), 80: (CO, "Cache Memory"), 81: (CO, "Cache Memory"),
    82: (OS, "Page Replacement"), 83: (OS, "Page Replacement"), 84: (D, "Combinatorics"), 85: (D, "Combinatorics"),
}
