# How to Create an Interactive Rust Lab with Cargo and Unit Tests?

**Coding labs** are a powerful feature of Fermion. By integrating coding labs into your platform, you can enhance user retention, provide hands-on experience, and encourage a learn-by-doing approach.

This guide walks you through setting up a Rust interactive coding lab.

:::tip
Before proceeding, it's highly recommended to watch [this video](https://www.youtube.com/watch?v=aBddZmWt0Sc&list=PLYxzS__5yYQnoUg4MCS2sew_tOZsgrUeH&index=4) and [this video](https://www.youtube.com/watch?v=SXep-fuTtmk&list=PLYxzS__5yYQnoUg4MCS2sew_tOZsgrUeH&index=5) to understand how Fermion coding labs are structured.
:::

## Step 1 - Creating the Lab

<!--@include: ../../../_components/lab-metadata.md-->

## Step 2 - Lab Instructions

<!--@include: ../../../_components/lab-instructions.md-->

## Step 3 - Lab Defaults

Lab defaults define the initial environment setup for the lab. It is crucial to configure this correctly to avoid confusing students.

For Rust labs, the playground must initialize a valid Rust project. You can do this by specifying a Git repository and branch with a basic `Cargo` project structure:

:::info
We recommend forking this repository: [Rust playground starter](https://github.com/codedamn-classrooms/rust-coding-lab-starter).
:::

This repository contains a minimal Rust project with a `Cargo.toml` file and a `src/main.rs` file. Once forked, update the repository link in your lab settings.

The repository also includes a `.cdmrc` file, a critical configuration file for Fermion labs. Familiarize yourself with the [.cdmrc guide](/docs/creating-coding-labs/cdmrc-file) to understand how it works before proceeding.

## Step 4 - Evaluation Script

The evaluation script is executed when the user clicks the **"Run Tests"** button in the playground. It runs the test cases written for the lab.

Here’s a sample bash script for a Rust lab:

```bash
#!/bin/bash
set -e 1

# Create a `.labtests` directory to store test files
mkdir -p /home/damner/code/.labtests

# Move the provided test file into the `.labtests` folder
mv $TEST_FILE_NAME /home/damner/code/.labtests/test.rs

cd /home/damner/code/.labtests;
rustc test.rs && ./test
```

### Explanation

-   **Set up environment:** The script sets the Rust version to stable and ensures the `cargo` toolchain is properly configured.
-   **Sequential Execution:** Using `--test-threads=1`, we ensure tests are run sequentially.
-   **Test file setup:** Moves the test file to a hidden `.labtests` folder and updates `Cargo.toml` to include it as a library test module.
-   **Run tests:** Executes `cargo test` with JSON output.
-   **Process results:** Processes the JSON output into a boolean array (`[true, false, true]`), representing the pass/fail state for each challenge.

## Step 5 - Test File

In the **"Custom Test File"** section of the lab, you can define test cases to validate the user's code.

Here’s a sample Rust test file:

```rust
// Include the user's default `lib.rs` file as usercode module
#[path = "/home/damner/code/src/lib.rs"]
mod usercode;

use usercode::*;
use std::env;
use std::fs::File;
use std::io::Write;

fn main() {
    let mut results = Vec::new();

    // Test 1
    results.push(run_test(|| {
        let a = 1;
        let b = 2;
        let res = add(a, b);
        res == 3
    }));

    // Test 2
    results.push(run_test(|| {
        let a = 2;
        let b = 3;
        let res = add(a, b);
        res == 5
    }));

    // Get output file path from environment variable
    let output_file = env::var("UNIT_TEST_OUTPUT_FILE")
        .expect("Environment variable UNIT_TEST_OUTPUT_FILE must be set");

    // Write results to the specified file in JSON format
    if let Err(e) = write_results_to_file(&results, &output_file) {
        eprintln!("Failed to write results to {}: {}", output_file, e);
    }
}

fn run_test<F>(test_fn: F) -> bool
where
    F: FnOnce() -> bool,
{
    test_fn()
}


fn write_results_to_file(results: &[bool], file_path: &str) -> std::io::Result<()> {
    // Manually format the boolean array as a JSON string
    let json_results = format!(
        "[{}]",
        results
            .iter()
            .map(|&b| b.to_string()) // Convert bool to "true"/"false"
            .collect::<Vec<_>>()
            .join(", ")
    );

    // Write the JSON string to the file
    let mut file = File::create(file_path)?;
    file.write_all(json_results.as_bytes())?;
    Ok(())
}
```

### Key Points

-   The length of boolean array `results` must match the challenges defined in the UI.
-   Tests must be executed sequentially and in order. This is because the boolean array you write to the output file must match the order in which you add challenges in the UI. This is why we don't use `cargo test` and instead run a rust script manually.

## Step 6 - Add Challenges

In the Fermion UI, define the challenges corresponding to the tests. Ensure the order of challenges matches the order of test cases in your test file.

For example:

-   Challenge 1: Verify the `add` function works correctly with input 1,2.
-   Challenge 2: Verify the `add` function works correctly with input 2,3.

This mapping ensures that the playground accurately reflects the user's progress.

---

Your interactive Rust lab is now ready! Students will be able to practice and learn Rust through real-world challenges, with tests running in a predictable, sequential order.
