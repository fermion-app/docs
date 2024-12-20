# How to create a Java lab with JUnit?

**Coding labs** are a powerful feature of Fermion. By integrating coding labs into your platform, you can enhance user retention, provide hands-on experience, and encourage a learn-by-doing approach.

This guide walks you through setting up a Java interactive coding lab.

## Step 1 - Creating the Lab

<!--@include: ../../../_components/lab-metadata.md-->

## Step 2 - Lab Instructions

<!--@include: ../../../_components/lab-instructions.md-->

## Step 3 - Lab Defaults

Lab defaults define the initial environment setup for the lab. It is crucial to configure this correctly to avoid confusing students.

For Java labs, the playground must initialize a valid Java project.

:::info
For Java playground, we recommend you to fork the following repository and use it as a starter template: [Java playground starter - codedamn](https://github.com/codedamn-classrooms/java-starter-playground)
:::

The repository also includes a `.cdmrc` file, a critical configuration file for Fermion labs. Familiarize yourself with the [.cdmrc guide](/docs/creating-coding-labs/cdmrc-file) to understand how it works before proceeding.

## Step 4 - Evaluation Script

Evaluation script is actually what runs when the user on the codedamn playground clicks on "Run Tests" button.

![](https://codedamn-website-assets.s3.us-east-1.amazonaws.com/uploads/17-11-2024/lab-run-tests.exllxt.png)
![](https://codedamn-website-assets.s3.us-east-1.amazonaws.com/uploads/17-11-2024/screenshot-000001%402x.ywpfjc.png)

Since we will write a script that runs as a JUint test utility, all we have to do is trigger that script via Java + JUnit and write it to proper file `$UNIT_TEST_OUTPUT_FILE` for the UI to show the results.

```sh
#!/bin/bash
set -e 1

# Compile user code
cd /home/damner/code
javac -cp . *.java

# setup test env
mkdir -p /home/damner/.labtests
cd /home/damner/.labtests
mv $TEST_FILE_NAME TestFile.java

# Download the junit5main.jar binary if not present
[ -e "junit5main.jar" ] || curl https://raw.githubusercontent.com/codedamn-classrooms/java-junit-files/main/junit5main.jar -o junit5main.jar

# Compile test file
javac -cp .:junit5main.jar TestFile.java

# Run the test file
java -jar junit5main.jar -cp .:/home/damner/code --select-class TestFile --reports-dir . || true

# Convert TEST-junit-jupiter.xml to JSON
yarn add xml2js
cat > process-result.js << EOF
const fs = require('fs')
const xmlFile = fs.readFileSync('./TEST-junit-jupiter.xml', 'utf8')
const { parseString } = require('xml2js')
parseString(xmlFile, (err, data) => {
    const results = []
    console.log(data.testsuite.testcase[0])
    for (let i = 0; i < data.testsuite.testcase.length; i++) {
        results.push(!data.testsuite.testcase[i].failure)
    }

    fs.writeFileSync(process.env.UNIT_TEST_OUTPUT_FILE, JSON.stringify(results))
})
EOF

# Run the node script to write results to playground UI
node process-result.js
```

This will make sure we run the full Java script and write the results properly for the playground IDE to read.

Let us understand what exactly is happening here:

-   We first of all, compile all the user code by going to `/home/damner/code` directory and running `javac -cp . *.java`. This would compile all files. If you want to compile your user code in a different way, you can do it here.
-   Next, we setup a temporary folder outside of user working space to download JUnit.
-   JUnit jar binary would be downloaded only once. On subsequent runs, it would be reused.
-   We then compile the `TestFile.java` (the JUnit code that we wrote in the full JUnit testing script above) with `junit5main.jar` being in the classpath.
-   Finally, we run the `TestFile` class using `--select-class TestFile` (remember, this is the same class name of the JUnit test script as we wrote above in Test File section).
-   We also add the user code in the classpath here itself so that we can import it directly in the test file (as we do).
-   Finally, the `--reports-dir` flag outputs the result in the same directory which then we read with a simple Node.js script.
-   JUnit outputs the results in XML. We use a simple `xml2js` parser to convert this into a JS object, and then convert the results into a boolean JSON array. We write this array inside `$UNIT_TEST_OUTPUT_FILE` which is then read by the playground and challenges are marked as passed or failed.

**Note:** You can setup a full testing environment in this block of evaluation script (installing more packages, etc. if you want). However, your test file will be timed out **after 30 seconds**. Therefore, make sure, all of your testing can happen within 30 seconds.

## Step 5 - Test File

Once you save the lab, you will see a button named `Edit Test File` in the `Evaluation` tab. Click on it.

<!-- ![](/images/common/lab-edit-test.png) -->

When you click on it, a new window will open. This is a test file area.

You can write anything here. Whatever script you write here, can be executed from the `Test command to run section` inside the evaluation tab we were in earlier.

The point of having a file like this to provide you with a place where you can write your evaluation script.

![](https://codedamn-website-assets.s3.us-east-1.amazonaws.com/uploads/17-11-2024/screenshot-000002%402x.mhhqir.png)

The moment you select the Java (JUint), the following code should appear in your editor:

```java

import static org.junit.jupiter.api.Assertions.*;

import java.io.ByteArrayInputStream;
import java.io.InputStream;
import java.io.PrintStream;

import org.junit.jupiter.api.*;
import org.junit.jupiter.api.MethodOrderer.OrderAnnotation;
import java.io.ByteArrayOutputStream;
import java.lang.reflect.Method;


@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
class TestFile {

    @BeforeAll
    public static void setupStuff() { // Runs before each test

    }

    @AfterAll
    public static void doCleanup() { // Runs after each test case

    }

    @Test
    @Order(1)
    public void test1() {
        try {
            Class classNameToTest = Class.forName("<Class Name Here>");
            Method methodToTest = classNameToTest.getMethod("< Method Name Here >"); // Optional: Add parameter types as second argument here

            var returnedOutput = methodToTest.invoke(null, null); // Give arguments as an array in 2nd parameter

            assertTrue(true); // Check for the expected output

        } catch(Exception e) {
            fail();
        }
    }
}
```

Let us understand what is happening here exactly:

-   Remember that we can code anything in this file and then execute it later. In this example, we're writing a JUnit test in Java.
-   With Java testing, it is possible that the user doesn't create methods or classes that you need to test. This might result in your whole test file to crash **if** you try to import it globally at the top.
-   Therefore, we **recommend** to use Reflection API in Java to test everything. This allows you to strictly pass/fail tests even if the methods/classes don't exist. Otherwise, your boilerplate code would always need to have empty definitions and all classes pre-made.
-   Reflection API might look very verbose in syntax but is fairly straightforward to implement once you understand the basics. You should learn about how to work with Reflection API in Java here: [Reflection API docs](https://javapapers.com/core-java/java-reflection-cheat-sheet/)
-   Also note that the tests here are run in order through `@TestMethodOrder(MethodOrderer.OrderAnnotation.class)` and `@Order(1)` decorators. This is important if you want to map the results of these tests (passed/failed) correctly with the tests you added in challenges tab earlier.

![](https://codedamn-website-assets.s3.us-east-1.amazonaws.com/uploads/17-11-2024/playground-tests.geugve.png)

-   Let's say your tests results from up is PASS, FAIL, PASS, PASS. Then, the following would be the output on playground:

![](https://codedamn-website-assets.s3.us-east-1.amazonaws.com/uploads/17-11-2024/playground-tests-2.tmstkq.png)

-   **Note:** If your test suite contain less tests than challenges added back in the UI, the "extra" UI challenges would automatically stay as "false". If you add more challenges in test file, the results would be ignored. Therefore, it is **important** that the number of tests you write in the testing class is same as the number of challenges you added in the challenges UI.

This completes your evaluation script for the lab. Your lab is now almost ready for users.

### Reading the output from stdout

There are situations when you want to validate the output that is being printed on the terminal. For example, If you ask the user to write a simple Java code that prints 'Hello World', and you want to test if the user was able to print it correct or not, in this case you can easily compare the terminals output by the expected output using the `ByteArrayOutputStream`.

In your test() method, you can use the `out.toString()` method from the `out` object declared at the class level to read the output from the terminal and finally do a `assertEquals()` to compare the output.

Sample Code to check `Hello World` program:

```java
import static org.junit.jupiter.api.Assertions.*;

import java.io.ByteArrayInputStream;
import java.io.InputStream;
import java.io.PrintStream;

import org.junit.jupiter.api.*;
import org.junit.jupiter.api.MethodOrderer.OrderAnnotation;
import java.io.ByteArrayOutputStream;
import java.lang.reflect.Method;


@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
class TestFile {

    // IO Streams
    private static final  ByteArrayOutputStream out = new ByteArrayOutputStream();
    private static final ByteArrayOutputStream err = new ByteArrayOutputStream();
    private static ByteArrayInputStream inputStream;

    // Backup Streams
    private static final PrintStream originalOut = System.out;
    private static final PrintStream originalErr = System.err;
    private static final InputStream originalInput = System.in;


    @BeforeAll
    public static void setStreams() { // Override all the streams to our custom IO streams
        System.setOut(new PrintStream(out));
        System.setErr(new PrintStream(err));
    }

    @AfterAll
    public static void restoreInitialStreams() { // Restores all the streams to its original backups
        System.setOut(originalOut);
        System.setErr(originalErr);
        System.setIn(originalInput);
    }


    @Test
    @Order(1)
    public void test1() {
        try {
            Class classNameToTest = Class.forName("<Class Name Here>");
            Method methodToTest = classNameToTest.getMethod("< Method Name Here >"); // Optional: Add parameter types as second argument here

            var returnedOutput = methodToTest.invoke(null, null); // Give arguments as an array in 2nd parameter

            String outputFromConsole = out.toString(); // Reads the output from the terminal

            assertTrue(true); // Check for the expected output

        } catch(Exception e) {
            fail();
        }
    }
}
```
