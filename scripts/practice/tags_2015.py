"""Subject/topic per question for GATE 2015 CS sessions 1-3 (read from the question images). 1-10 = General Aptitude, 11-65 = CS Q.1-55."""
from tags_2016 import GA, D, LA, CA, PS, DL, CO, PD, AL, TC, CD, OS, DB, CN

VA, NA = "Verbal Ability", "Numerical Ability"
CS1 = {
    1: (GA, VA), 2: (GA, VA), 3: (GA, VA), 4: (GA, "Numerical Ability: Data Sufficiency"), 5: (GA, "Numerical Ability: Probability"),
    6: (GA, VA), 7: (GA, "Verbal Reasoning: Courses of Action"), 8: (GA, "Data Interpretation: Pie Chart"),
    9: (GA, "Numerical Ability: Probability"), 10: (GA, "Data Interpretation: Tables"),
    11: (CA, "Functions"), 12: (CA, "Limits"), 13: (AL, "Algorithm Design Paradigms"), 14: (AL, "Sorting: Quicksort"),
    15: (PD, "Binary Trees"), 16: (PD, "Software Testing"), 17: (PD, "Binary Search Trees"), 18: (CD, "Shift-Reduce Parsing"),
    19: (D, "Propositional Logic"), 20: (D, "Set Theory"), 21: (DL, "Counters"), 22: (CO, "Instruction Formats"),
    23: (CN, "TCP"), 24: (CN, "Network Security: Symmetric Keys"), 25: (DB, "XML"), 26: (CN, "IP Header"), 27: (CN, "Application Layer Protocols"),
    28: (TC, "Closure Properties"), 29: (OS, "Paging"), 30: (OS, "Process Synchronization"), 31: (DB, "Relational Algebra and SQL"),
    32: (DB, "Indexing"), 33: (LA, "LU Decomposition"), 34: (PD, "Pointers and Parameter Passing"), 35: (PD, "Binary Search Trees"),
    36: (CN, "Stop-and-Wait Protocol"), 37: (PD, "Heaps"), 38: (PD, "Software Testing: Cyclomatic Complexity"), 39: (CN, "LAN: Medium Access"),
    40: (D, "Algebraic Structures"), 41: (CA, "Series and Sums"), 42: (D, "Lattices"), 43: (DL, "Functional Completeness"),
    44: (D, "Planar Graphs"), 45: (D, "Recurrence Relations"), 46: (CD, "Liveness Analysis"), 47: (CD, "Intermediate Code Generation"),
    48: (DB, "ER Model"), 49: (TC, "DFA Minimization"), 50: (TC, "Pushdown Automata"), 51: (AL, "Graph Traversal: BFS"),
    52: (OS, "Real-Time Scheduling"), 53: (DL, "Sequential Circuits: Flip-Flops"), 54: (CO, "Disk Access Time"), 55: (CO, "Pipelining"),
    56: (OS, "Disk Scheduling"), 57: (OS, "Page Replacement"), 58: (CA, "Definite Integrals"), 59: (LA, "Eigenvalues"),
    60: (PD, "Data Structures: Priority Queues"), 61: (DB, "SQL"), 62: (PD, "Pointers and Arrays in C"), 63: (AL, "Minimum Spanning Trees"),
    64: (AL, "Time Complexity: Loops"), 65: (PD, "Program Correctness"),
}

CS2 = {
    1: (GA, VA), 2: (GA, VA), 3: (GA, VA), 4: (GA, "Numerical Ability: Data Sufficiency"), 5: (GA, NA), 6: (GA, VA),
    7: (GA, "Numerical Ability: Geometry"), 8: (GA, NA), 9: (GA, "Numerical Ability: Sequences"), 10: (GA, "Numerical Ability: Distances"),
    11: (D, "Propositional Logic"), 12: (D, "Set Theory"), 13: (D, "Relations"), 14: (D, "Number Theory"), 15: (LA, "Eigenvalues"),
    16: (AL, "Searching"), 17: (DL, "Counters"), 18: (CO, "Cache Memory"), 19: (CO, "TLB and Virtual Memory"),
    20: (TC, "Decidability"), 21: (PD, "Recursion"), 22: (PD, "Heaps"), 23: (PD, "Binary Trees"), 24: (PD, "Recursion"),
    25: (PD, "Software Engineering: Requirements"), 26: (AL, "NP-Hardness and Reductions"), 27: (CD, "Compiler Phases"),
    28: (CD, "Syntax Trees and Control Flow Graphs"), 29: (PD, "Software Engineering: COCOMO"), 30: (OS, "Deadlock"),
    31: (DB, "Transactions: ACID"), 32: (DB, "B+ Trees"), 33: (CN, "Sockets"), 34: (CN, "Stop-and-Wait Protocol"),
    35: (CN, "HTTP Cookies"), 36: (CN, "IP Routing"), 37: (CN, "IPv4 Fragmentation"), 38: (CN, "TCP Window Scaling"),
    39: (DB, "Recovery and Logging"), 40: (DB, "Joins"), 41: (OS, "Memory Allocation"), 42: (CO, "Disk Access Time"),
    43: (OS, "Paging"), 44: (CD, "Intermediate Code and Control Flow Graphs"), 45: (TC, "DFA Minimization"),
    46: (TC, "Regular Languages"), 47: (AL, "Algorithm Design Paradigms"), 48: (PD, "Data Structures: Young Tableau"),
    49: (AL, "Selection: Quickselect"), 50: (PD, "Hashing"), 51: (CA, "Numerical Methods: Secant Method"), 52: (PD, "Stacks in C"),
    53: (CO, "Pipelining"), 54: (CO, "Subroutine Calls and Stack"), 55: (DL, "Boolean Minimization"), 56: (CA, "Integration"),
    57: (LA, "Determinants"), 58: (D, "Counting: Onto Functions"), 59: (PS, "Probability"), 60: (TC, "Regular Expressions"),
    61: (D, "Graph Theory"), 62: (D, "Graph Theory: Bridges"), 63: (D, "Predicate Logic"), 64: (PD, "Software Testing"),
    65: (DL, "Adders"),
}

CS3 = {
    1: (GA, VA), 2: (GA, "Verbal Ability: Analogies"), 3: (GA, VA), 4: (GA, "Numerical Ability: Coding"), 5: (GA, "Numerical Ability: Linear Functions"),
    6: (GA, "Verbal Reasoning: Inference"), 7: (GA, "Verbal Reasoning: Inference"), 8: (GA, "Data Interpretation: Bar Chart"),
    9: (GA, "Numerical Ability: Graphs of Functions"), 10: (GA, "Logical Reasoning: Arrangements"),
    11: (PD, "Strings and Pointers in C"), 12: (D, "Set Theory"), 13: (DB, "Functional Dependencies"), 14: (OS, "Process States"),
    15: (CD, "LR Parsers"), 16: (DL, "Boolean Algebra"), 17: (PD, "Software Engineering: Function Points"), 18: (CN, "Application Layer: HTML and URLs"),
    19: (CN, "TCP"), 20: (AL, "Asymptotic Notation"), 21: (PD, "Binary Trees"), 22: (PD, "Hashing"), 23: (LA, "Eigenvectors"),
    24: (CA, "Limits"), 25: (D, "Counting"), 26: (D, "Propositional Logic"), 27: (PD, "Binary Search Trees"), 28: (PD, "Stacks: Postfix Evaluation"),
    29: (DB, "SQL"), 30: (PD, "Heaps"), 31: (OS, "Process Synchronization"), 32: (TC, "DFA and Regular Expressions"),
    33: (PD, "Software Testing: Fault Seeding"), 34: (CO, "Cache Memory"), 35: (CN, "CSMA/CD"), 36: (CA, "Numerical Integration"),
    37: (AL, "Time Complexity: Merge Sort"), 38: (PD, "Recursion"), 39: (DB, "B+ Trees"), 40: (DL, "Boolean Functions"),
    41: (AL, "Polynomial-Time Reductions"), 42: (PD, "Scope and Static Variables"), 43: (PD, "Pointers and Arrays in C"),
    44: (TC, "Context-Free Languages"), 45: (OS, "Deadlock Prevention"), 46: (CN, "IP Addressing"), 47: (CN, "Go-Back-N Protocol"),
    48: (CO, "Pipelining: Reservation Table"), 49: (CO, "Pipelining: Data Dependencies"), 50: (CO, "Memory Locality"),
    51: (DB, "Transactions: Recoverability"), 52: (LA, "Systems of Linear Equations"), 53: (PD, "Control Flow in C"),
    54: (CA, "Definite Integrals"), 55: (AL, "Minimum Spanning Trees"), 56: (CN, "Packet Switching Delay"), 57: (OS, "CPU Scheduling"),
    58: (PD, "Software Testing: Cyclomatic Complexity"), 59: (DL, "Number Systems"), 60: (D, "Relations"), 61: (PS, "Random Variables"),
    62: (DL, "Prime Implicants"), 63: (AL, "Modular Exponentiation"), 64: (AL, "Asymptotic Notation"), 65: (CD, "LL(1) and LR(1) Parsing"),
}
