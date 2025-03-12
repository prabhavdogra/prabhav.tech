---
slug: memory_hierarchy
title: "What does memory mean actually?"
authors: [prabhavdogra]
tags: [go]
---

### Introduction

While exploring how Go manages memory, I stumbled upon an intricate hierarchy that determines how fast data moves between the CPU and RAM. Go’s runtime optimizations, like garbage collection and stack allocation, made me curious about what happens under the hood. This led me to registers, caches (L1, L2, L3), and RAM—each playing a crucial role in balancing speed and storage.

## Prerequisites: What's a CPU Cycle?
**CPU Cycle:** 
    - It's the smallest unit of processing that a CPU can do.
    - Each cycle allows the CPU to execute instructions like fetching data, performing arithmetic, or storing results.
    - For example: the method `atomic.CompareAndSwap` in go is executed as follows:
        - It reads a value from memory.
        - It compares it with an expected value.
        - If they match, it writes a new value.
        - This requires at least three steps (read, compare, write), which take multiple cycles.
    - A single 1GHz CPU can complete one CPU cycle in 1 nanosecond.
    - Similarly, a 3GHz CPU can complete one CPU cycle in 0.33 nanoseconds.
    - Not Every Operation Takes 1 Cycle
        - Simple instructions like integer addition (a + b) may take 1 cycle.
        - More complex operations (e.g., division, memory access) can take multiple cycles.


## Understanding Computer Memory Hierarchy
1. **Registers (Fastest, Smallest)**
    - Located inside the CPU, closest to the execution units.
    - Stores data for immediate operations (e.g., arithmetic calculations).
    - Extremely small (few bytes) but operates at CPU clock speed.
    - Access time: 1 CPU cycle (fastest).
2. **L1 Cache (Level 1)**
    * Smallest and fastest cache (typically 32KB to 128KB per core).
    * Directly integrated into the CPU core.
    * Stores frequently used instructions and data for ultra*fast access.
    * Access time: 2-4 CPU cycles.
3. **L2 Cache (Level 2)**
    - Larger than L1 (256KB to a few MB per core).
    - Slightly slower than L1 but still much faster than RAM.
    - Used to store recently accessed data that might be needed again soon.
    - Access time: 10-20 CPU cycles.
4. **L3 Cache (Level 3)**
    - Shared among multiple CPU cores, ranging from a few MB to tens of MB.
    - Acts as a buffer between L2 and RAM, reducing latency for core-to-core communication.
    - Access time: 30-60 CPU cycles.
5. **RAM (Random Access Memory)**
    - Main working memory for the system (GBs in size).
    - Much slower than CPU caches but holds more data.
    - Stores active processes and data that aren’t frequently used by the CPU.
    - Access time: 100+ CPU cycles.

## Registers: The Fastest Storage
### What Are Registers?
Registers are ultra-fast, small storage units embedded directly inside a computer’s CPU (Central Processing Unit). They are temporary holding areas for data, instructions, or memory addresses that the CPU needs to access immediately during computations. Registers are the fastest type of memory in a computer, designed to minimize delays in processing.

### How Registers Work?
- **Fetching Data:** When the CPU needs to perform an operation (e.g., 5 + 3), it first copies the values 5 and 3 from RAM into two registers.
- **Processing:** The CPU’s arithmetic logic unit (ALU) performs the addition directly using the values stored in the registers.
- **Storing Results:** The result (8) is placed into another register, which can either be used for further operations or written back to RAM.

1. **Basic Structure: Flip-Flops**
    - **Core Component:** Registers are built using D-type flip-flops, which store one bit each. A 32-bit register, for example, contains 32 flip-flops.
    - **Function:** Each flip-flop has:
        - **Data Input (D):** Receives the bit to store.
        - **Clock Input (CLK):** Synchronizes when the input is captured. This means that data is not stored immediately when placed on the input but is instead captured only when the clock signal triggers.
        - **Output (Q):** Provides the stored bit.
        - **Write Enable (WE):** Determines if the flip-flop updates its value on the next CPU cycle

2. **Data Storage and Clock Synchronization**

    **Writing Data:**
    * When the CPU writes to a register:
        * The write enable signal for the register is activated.
        * Data is placed on the **input bus**.  The input bus is a set of electrical connections that carry data to the register.
        * In the **next CPU Cycle**, the flip-flops capture the input values.

    **Reading Data:**
    1. **Stored Data in Flip-Flops**
        - A register consists of multiple flip-flops, each storing a single bit. Once a value is stored in a flip-flop, it remains available at its output until changed by a new write operation. However, this stored value is not automatically placed on the CPU’s internal bus—something must send the data when the data is read.
        - Each flip-flop's output is connected to a tri-state buffer, which controls whether the stored bit is driven onto the bus connecting CPU and register (for reading the bit).
    2. **Role of the Tri-State Buffer**
        - Tri-State Buffer ensures conflict-free (kindof like mutex) data access, enabling the CPU to perform billions of operations per second reliably.
        - A tri-state buffer is a special circuit that can either:
            - **Tri-State Buffer Enabled:** Passes the stored data from the register to the bus connecting CPU and register.
            - **Tri-State Buffer Disabled:** Disconnects the register from bus connecting CPU and register.
        - This is necessary because multiple registers share the same internal bus, and only one should be active at a time to avoid conflicting reads and writes.
        - The enable signal is synchronized with the CPU clock to ensure stable data transfer.

### Types of Registers
- **General-Purpose Registers:**
    - Used for temporary data storage and most calculations.
- **Special-Purpose Registers:**
    - **Program Counter (PC):** Holds the memory address of the next instruction to execute.
    - **Instruction Register (IR):** Stores the current instruction being decoded/executed.
    - **Stack Pointer (SP)**: Tracks the top of the stack in memory.
    - **Status/Flag Register**: Stores metadata about operations (e.g., whether a result was zero or caused an overflow).

### Why Registers Are Essential
- **Eliminate Bottlenecks:** Without registers, the CPU would need to read/write data directly from RAM for every operation, which is too slow.
- **Enable Pipelining:** Registers allow the CPU to work on multiple instructions simultaneously by holding intermediate states.
- **Direct Hardware Access:** Registers interface directly with the CPU’s ALU and control unit, enabling rapid execution of machine-level instructions.

## CPU Cache: L1, L2, L3 CPU caches
CPU Caches are small, ultra-fast memory layers between the CPU and main memory (RAM). They store frequently accessed data and instructions to reduce latency and improve performance. Modern CPUs use three levels of cache:

There are two types of cached instructions:
- **Instruction Cache:**
    - **What it stores:**
        - Instructions are the actual binary code (machine code) of the program being executed by the CPU.
        - Examples: `ADD`, `MOV`, `JUMP`, `LOAD`, or any operation the CPU performs.
    - **Purpose:**
        - Allows the CPU to quickly fetch the next operation to execute.
        - For example, when running a loop, the instruction cache holds the repeated code (`for`, `while` loops) so the CPU doesn’t have to fetch it repeatedly from slower memory.
* **Data Cache:**
    * **What it stores:**
        * Data refers to the values the CPU is actively working with.
        * Examples: Variables (e.g., int x = 5), memory addresses, temporary results, or input/output values.
    * **Purpose:**
        * Provides fast access to the operands (numbers, addresses) needed by instructions.
        * For example, when calculating x + y, the data cache holds the values of x and y for the ADD instruction to use.

**Why Split Them?**
    - **Parallel Access:**
        * The CPU can fetch the next instruction (from the instruction cache) while simultaneously reading/writing data (from the data cache). This avoids bottlenecks.
        * **Example:** While executing an ADD instruction, the CPU can already fetch the next instruction (MOV or JUMP) from the instruction cache.
    - **Specialization:**
        - Instruction caches are optimized for sequential access (program code is usually read in order).
        - Data caches are optimized for random access (variables can be accessed in any order).

### L1 Cache (Level 1 Cache)
- **Role:**
    - The fastest and smallest cache, directly integrated into the CPU core.
    - Split into L1 Instruction Cache (stores executable code) and L1 Data Cache (stores data).
- **Characteristics:**
    * **Size:** Typically 32–64 KB per core (e.g., 64 KB total: 32 KB data + 32 KB instructions).
    * **Speed:** 1–4 clock cycles access time (fastest).
    * **Location:** Embedded within each CPU core.

### L2 Cache (Level 2 Cache)
- **Role:**
    - Acts as a middle layer between L1 and L3.
    - Stores data/instructions not held in L1 but likely to be reused.
- **Characteristics:**
    - **Size:** 256 KB–2 MB per core (varies by CPU design).
    - **Speed**: 10–20 clock cycles access time.
    - **Location**: May be shared between cores or dedicated per core (e.g., AMD Zen vs. Intel Core).

### L3 Cache (Level 3 Cache)
- **Role:**
    - The largest and slowest CPU cache, shared across all cores.
    - Reduces traffic to RAM by storing data shared between multiple cores.
- **Characteristics**:
    - **Size**: 4–64 MB 
    - **Speed**: 20–50 clock cycles access time.
    - **Location**: On the CPU die but outside individual cores.

### Why Three Levels?
- **Latency vs. Size Trade-off:** L1 prioritizes speed for critical data, L2 balances speed and size, and L3 minimizes RAM access.
- **Efficiency:** Reduces "cache misses" by filtering requests through layers (90% of data is often found in L1/L2).
- **Multicore Optimization:** L3 enables shared data (e.g., game textures, OS tasks) to stay accessible to all cores.

**Practical Example:**
- When running a game:
    - L1: Stores code for rendering a character (e.g., position calculations).
    - L2: Caches textures used in the current scene.
    - L3: Holds shared assets like audio files or global physics data.

### Why not replace L2 and L3 with L1?
- **Physical Limits:**
    - L1 is fast but bulky/power-hungry. Scaling it to L2/L3 sizes would make CPUs impractical (cost, heat, latency).
- **Hierarchy Efficiency**:
    - **L1**: Speed-optimized for critical data.
    - **L2**: Balances size/speed for common data.
    - **L3**: Shared, large storage to minimize RAM trips.
- **Cache Miss Mitigation**:
    - Without L2/L3, frequent RAM access (~100x slower) would cripple performance.
- **Power/Heat**:
    - Larger L1 would drain power and overheat CPUs.
- **Multicore Sharing**:
    - L3 allows cores to access shared data without duplicating it in L1/L2.

## RAM: The Parts of the Memory Cell
Imagine a single memory cell in your computer’s RAM (the temporary memory your computer uses to do stuff). Think of it like a tiny light switch and a tiny battery working together to store a 0 or a 1 (the basic "yes/no" language computers use). Here’s how it works:
- **Capacitor:** A tiny “battery” that can hold an electric charge.
    * Charged (has electricity) = 1
    * Not charged (empty) = 0
- **Transistor:** A tiny “light switch” that controls access to the capacitor.
    * ON (switch closed) = Lets electricity flow.
    * OFF (switch open) = Blocks electricity.
- **Address Line:** The wire that tells the transistor to turn ON/OFF.
- **Data Line:** The wire that reads or writes the charge (0 or 1) to the capacitor.

### How It Works
1. Writing Data (Saving a 0 or 1)
    - **Step 1:** The CPU (computer’s brain) says, “Hey, I need to save a 1 at this specific memory cell!”
    - **Step 2:** The Address Line sends electricity (like flipping the switch ON).
    - **Step 3:** The Data Line sends electricity to charge the capacitor (filling the tiny battery).
    **Result:** Capacitor is charged = 1 is stored.
    If the CPU wants to save a 0, the Data Line drains the capacitor instead.
2. Reading Data (Checking if it’s 0 or 1)
    - **Step 1:** The CPU says, “What’s stored at this memory cell?”
    - **Step 2:** The Address Line sends electricity (switch ON).
    - **Step 3:** If the capacitor is charged (storing 1), electricity flows out through the Data Line.
        - **Result:** The CPU detects this flow = 1.
    - **Step 4:** If the capacitor is empty (storing 0), no electricity flows.
        - **Result:** The CPU detects no flow = 0.

### Refresh Cycle
- Each DRAM cell consists of a **capacitor (storing a 1 or 0 as charge)** and an **access transistor**. 
- When a cell is **“charged” (1)** or **“discharged” (0)**, that state is maintained only temporarily because the charge leaks away.
- The **DRAM controller (or memory controller)** periodically reads each memory cell and then rewrites (recharges) it to restore the original value. This **refresh cycle** typically occurs every 64–128 milliseconds for all cells.
- Without refreshing, the leakage would eventually cause the stored bits to flip, leading to data corruption. The periodic refresh ensures data integrity over time.

Inspired by: https://medium.com/@ankur_anand/a-visual-guide-to-golang-memory-allocator-from-ground-up-e132258453ed