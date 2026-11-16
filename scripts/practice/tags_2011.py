"""Subject/topic per question for GATE 2011 CS, keyed by the paper's own number (CS Q.1-55, General Aptitude Q.56-65)."""
from tags_2016 import GA, D, LA, CA, PS, DL, CO, PD, AL, TC, CD, OS, DB, CN

CS = {
    1: (CD, "Lexical Analysis"), 2: (CN, "Firewalls"), 3: (PS, "Conditional Probability"), 4: (CN, "Application Layer Protocols"),
    5: (PD, "Software Engineering: Cost Estimation"), 6: (OS, "Context Switching"), 7: (PD, "Software Engineering: COCOMO"),
    8: (TC, "Automata: Expressive Power"), 9: (CN, "HTML"), 10: (PD, "Software Engineering: Requirements"), 11: (CO, "Interrupts"),
    12: (DB, "Keys"), 13: (DL, "Logic Gates"), 14: (DL, "Boolean Minimization"), 15: (DL, "Counters"), 16: (OS, "Threads"),
    17: (D, "Planar Graphs"), 18: (PS, "Expectation and Variance"), 19: (CD, "Lexical Analysis"), 20: (OS, "Virtual Memory: Effective Access Time"),
    21: (CO, "Addressing Modes"), 22: (PD, "Strings and Pointers in C"), 23: (PD, "Heaps"), 24: (TC, "Regular Languages"),
    25: (AL, "Dynamic Programming"), 26: (TC, "Language Classes"), 27: (CD, "Parse Trees"), 28: (CO, "DMA and Interrupt-Driven I/O"),
    29: (PD, "Binary Search Trees"), 30: (D, "Predicate Logic"), 31: (CA, "Definite Integrals"), 32: (DB, "SQL"),
    33: (PS, "Mean and Standard Deviation"), 34: (PS, "Probability"), 35: (OS, "CPU Scheduling"), 36: (CD, "Expression Evaluation and Registers"),
    37: (AL, "Asymptotic Notation"), 38: (AL, "Matrix Chain Multiplication"), 39: (DB, "Indexing and Hashing"), 40: (LA, "Eigenvalues"),
    41: (CO, "Pipelining"), 42: (TC, "DFA Minimization"), 43: (CO, "Cache Memory"), 44: (CO, "Disk Access Time"), 45: (TC, "DFA Minimization"),
    46: (DB, "SQL"), 47: (PD, "Software Testing"), 48: (PD, "Recursion"), 49: (PD, "Recursion"), 50: (DL, "Counters"), 51: (DL, "Counters"),
    52: (CN, "Distance Vector Routing"), 53: (CN, "Distance Vector Routing"), 54: (AL, "Minimum Spanning Trees"), 55: (AL, "Minimum Spanning Trees"),
    56: (GA, "Verbal Ability"), 57: (GA, "Numerical Ability: Logarithms"), 58: (GA, "Verbal Ability"), 59: (GA, "Verbal Ability"),
    60: (GA, "Verbal Ability"), 61: (GA, "Verbal Reasoning: Comprehension"), 62: (GA, "Data Interpretation: Chart"),
    63: (GA, "Numerical Ability: Optimisation"), 64: (GA, "Numerical Ability"), 65: (GA, "Numerical Ability: Mixtures"),
}
