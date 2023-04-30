# Development processes

## Implement feature

1. Create branch which contains issue number and short description. Example

`GQL-7/authorization`

2. Implement feature in appropriate branch

3. Create commit which name contains issue type (init, feat, fix, chore, docs, test, style, refactor, perf, build, ci, revert), issue number with "#" symbol and short issue description (up to 88 symbols). Example

`feat: #7 implement user authorization`

`feat: #7 implement user authorization`

3. Merge (or pull --rebase) changes from develop and resolve conflicts

4. All tests should be successful

5. All modules could be build

6. Push branch to remote repo

7. Create PR to develop. PR name should contains issue number with "#" symbol and full issue name. Example

`feat: #7 implement user authorization"`

8. Wait for approves

9. Resolve all conversations in PR (maybe additional changes required)

10. Squosh to develop
