"""Subject/topic per question for GATE 2016 CS, read from the paper text. Numbers 1-10 = General Aptitude, 11-65 = CS Q.1-55."""
GA = "General Aptitude"
D, LA, CA, PS = "Discrete Mathematics", "Linear Algebra", "Calculus", "Probability and Statistics"
DL, CO, PD, AL = "Digital Logic", "Computer Organization", "Programming and Data Structures", "Algorithms"
TC, CD, OS, DB, CN = "Theory of Computation", "Compiler Design", "Operating System", "Databases", "Computer Networks"

CS1 = {
    1: (GA, "Verbal Ability: Grammar"), 2: (GA, "Verbal Ability: Vocabulary"), 3: (GA, "Verbal Ability: Vocabulary"),
    4: (GA, "Verbal Reasoning: Coding"), 5: (GA, "Numerical Ability: Geometry"), 6: (GA, "Data Interpretation: Tables"),
    7: (GA, "Numerical Ability: Counting"), 8: (GA, "Verbal Reasoning: Logical Deduction"),
    9: (GA, "Numerical Ability: Polynomials"), 10: (GA, "Numerical Ability: Functions"),
    11: (D, "Propositional Logic"), 12: (D, "Recurrence Relations"), 13: (CA, "Limits"), 14: (PS, "Probability Density Function"),
    15: (LA, "Eigenvalues and Determinant"), 16: (DL, "Boolean Algebra"), 17: (DL, "Number Representation"),
    18: (DL, "Counters"), 19: (CO, "Memory Addressing"), 20: (PD, "Queues"), 21: (AL, "Graph Algorithms: Topological Sort"),
    22: (PD, "Pointers and Functions in C"), 23: (AL, "Sorting: Time Complexity"), 24: (AL, "Minimum Spanning Tree"),
    25: (PD, "Pointers: Call by Value"), 26: (TC, "Grammars and Languages"), 27: (TC, "Decidability"),
    28: (TC, "Regular Expressions"), 29: (CD, "Code Optimization"), 30: (OS, "CPU Scheduling"),
    31: (DB, "Keys: Superkey"), 32: (DB, "Transactions: ACID"), 33: (DB, "Normalization"),
    34: (CN, "Application Layer Protocols"), 35: (CN, "Application Layer Protocols"), 36: (D, "Generating Functions"),
    37: (D, "Recurrence Relations"), 38: (D, "Functions"), 39: (PS, "Conditional Probability"), 40: (DL, "Multiplexers"),
    41: (CO, "DMA"), 42: (CO, "Pipelining"), 43: (DL, "Adders"), 44: (PD, "Loops and Array Algorithms"),
    45: (PD, "Recursion: Static Variables"), 46: (PD, "Parameter Passing and Scope"), 47: (PD, "Heaps"),
    48: (AL, "Graph Algorithms"), 49: (AL, "Minimum Spanning Tree"), 50: (AL, "Minimum Spanning Tree"),
    51: (PD, "Stacks and Queues"), 52: (TC, "Context-Free Grammars"), 53: (TC, "Pushdown Automata"),
    54: (TC, "Decidability: Reductions"), 55: (CD, "Operator Grammars and Parsing"), 56: (CD, "Syntax Directed Translation"),
    57: (OS, "Virtual Memory: Paging"), 58: (OS, "Disk Scheduling"), 59: (OS, "Page Replacement"),
    60: (OS, "Process Synchronization"), 61: (DB, "Concurrency Control: Two-Phase Locking"),
    62: (CN, "Network Security: Digital Signatures"), 63: (CN, "IP Fragmentation"),
    64: (CN, "Congestion Control: Token Bucket"), 65: (CN, "Flow Control: Stop-and-Wait"),
}

CS2 = {
    1: (GA, "Verbal Ability: Sentence Completion"), 2: (GA, "Verbal Ability: Sentence Completion"),
    3: (GA, "Verbal Ability: Odd One Out"), 4: (GA, "Verbal Reasoning: Odd One Out"),
    5: (GA, "Numerical Ability: Quadratic Equations"), 6: (GA, "Numerical Ability: Sets"),
    7: (GA, "Verbal Reasoning: Inference"), 8: (GA, "Verbal Reasoning: Logical Deduction"),
    9: (GA, "Numerical Ability: Counting"), 10: (GA, "Numerical Ability: Graphs of Functions"),
    11: (D, "Propositional Logic"), 12: (CA, "Polynomials and Derivatives"), 13: (D, "Graph Coloring"),
    14: (LA, "Systems of Linear Equations"), 15: (PS, "Conditional Probability"), 16: (LA, "Eigenvalues and Determinant"),
    17: (DL, "Adders and Overflow"), 18: (DL, "Boolean Algebra"), 19: (DL, "Number Representation"),
    20: (CO, "Instruction Format"), 21: (AL, "Graph Traversal: BFS"), 22: (PD, "Pointers: Call by Value"),
    23: (AL, "Sorting"), 24: (AL, "Dynamic Programming"), 25: (PD, "Linked Lists"), 26: (TC, "Minimal DFA"),
    27: (TC, "Context-Free Languages"), 28: (TC, "Language Hierarchy"), 29: (CD, "Phases of a Compiler"),
    30: (OS, "Page Replacement"), 31: (DB, "Indexing: B+ Trees"), 32: (DB, "Concurrency Control: Serializability"),
    33: (CN, "Network Security: Digital Signatures"), 34: (CN, "Ethernet and MAC"), 35: (CN, "Application Layer Protocols"),
    36: (D, "Relations"), 37: (D, "Predicate Logic"), 38: (D, "Graph Theory"), 39: (D, "Modular Arithmetic"),
    40: (CO, "Pipelining"), 41: (CO, "Instruction Format"), 42: (CO, "Cache Memory"), 43: (CO, "Pipelining"),
    44: (PD, "Heaps"), 45: (PD, "Loop Invariants"), 46: (PD, "Tree Traversal"), 47: (PD, "Recursion"),
    48: (AL, "Dynamic Programming: Matrix Chain"), 49: (AL, "Recurrence and Time Complexity"),
    50: (PD, "Binary Search Trees"), 51: (AL, "Graph Representation"), 52: (TC, "Finite Automata"),
    53: (TC, "Context-Free Languages"), 54: (TC, "Decidability"), 55: (CD, "Left Recursion"), 56: (CD, "Grammars"),
    57: (OS, "CPU Scheduling"), 58: (OS, "Process Synchronization"), 59: (OS, "Semaphores"),
    60: (OS, "File Systems and Caching"), 61: (DB, "Transactions: Recoverability"), 62: (DB, "SQL"),
    63: (CN, "CSMA/CD"), 64: (CN, "IEEE 802.11 Wireless LAN"), 65: (CN, "Sliding Window: Selective Repeat"),
}
