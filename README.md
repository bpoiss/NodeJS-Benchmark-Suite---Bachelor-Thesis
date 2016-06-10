# NodeJS Benchmark Suite - Bachelor Thesis

## Proposal

Node.js is a JavaScript-based runtime environment (mostly) for server-sided web applications. To track the performance of engines executing Node.js applications and compare them, a set of Node.js specific benchmarks should be written. While existing JavaScript benchmark suites test the performance of the core runtime, the set should facilitate the characteristics of typical Node.js applications, such as parallel request handling, IO performance, VM-level performance (e.g., garbage collection). In this project, one or more Node.js benchmarks should be developed that evaluate the performance of a Node.js-compatible runtime under different workload conditions. The Node.js applications should correspond to realistic applications using existing Node.js modules found in the Node.js Npm registry.

The scope of this thesis is as follows:

* Identify a set of Npm modules that can be considered relevant for performance testing.
* Develop one or more Node.js applications, corresponding to realistic applications that use the existing Npm modules.
* Develop a benchmarking harness to test the Node.js applications under realistic workload conditions. The benchmarking harness should use existing workload generation tools (e.g., JMeter) configured to generate complex interactions with the applications under load testing.
* (optional) an analysis of the characteristics of each Node.js application could be done to characterize the specific aspects of the workload.