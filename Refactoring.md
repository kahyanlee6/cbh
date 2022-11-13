# Refactoring

You've been asked to refactor the function `deterministicPartitionKey` in [`dpk.js`](dpk.js) to make it easier to read and understand without changing its functionality. For this task, you should:

1. Write unit tests to cover the existing functionality and ensure that your refactor doesn't break it. We typically use `jest`, but if you have another library you prefer, feel free to use it.
2. Refactor the function to be as "clean" and "readable" as possible. There are many valid ways to define those words - use your own personal definitions, but be prepared to defend them. Note that we do like to use the latest JS language features when applicable.
3. Write up a brief (~1 paragraph) explanation of why you made the choices you did and why specifically your version is more "readable" than the original.

You will be graded on the exhaustiveness and quality of your unit tests, the depth of your refactor, and the level of insight into your thought process provided by the written explanation.

## Your Explanation Here

- I kept the original code and renamed deterministicPartitionKeyOriginal whereas my refactored code is called deterministicPartitionKey

* There were several if/else statements that were difficult to track which "else" statement belonged to which "if" statement. The placement of some else statements were not ideal. For example, the else statement that came after if(candidate), should instead belong to the if(event) statement because if there is no event, there is no candidate. My biggest issue was with the flow and grouping of the if/else statements. The biggest thing I tried to achieve with refactoring was making sure that the if/else statement will only be present where it makes sense. Another example of this is the code if (candidate.length > MAX_PARTITION_KEY_LENGTH). This if statement will never be true if there is no event because then candidate will = "0", so there is no point in putting this if statement at the very end, but rather put it within the brackets belonging to the if(event).
