# Question Queue

## Hierarchy

```mermaid
graph TD
QuestionQueue-->Queue
QuestionQueue-->SuggestedFeed
SuggestedFeed-->QuestionStats
SuggestedFeed-->QueueButton
Queue-->QueueControls
Queue-->DraggableList
Queue-->StaticList
DraggableList-->DraggableCard
StaticList-->StaticCard
StaticCard-->CustomLabel
```
