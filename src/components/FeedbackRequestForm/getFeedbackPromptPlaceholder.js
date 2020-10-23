const FEEDBACK_PROMPT_PLACEHOLDERS = [
    "I've mixed my own track for the first time, so any tips on mixing would be massively appreciated!",
    "I tried to be more experimental with the second drop. Does it work?",
    "I'm going for Evil Needle-style drums, but I feel like I'm missing something.",
    "Is the sub too loud?",
    "I don't have an intro yet. Any ideas?",
    "This is for a beat challenge. The rules were 90bpm, must use at least three saxophone samples...",
    "Would you consider this a beat to study/chill/relax to?",
];

const getFeedbackPromptPlaceholder = () => FEEDBACK_PROMPT_PLACEHOLDERS[
    Math.floor(Math.random() * FEEDBACK_PROMPT_PLACEHOLDERS.length)
];

export default getFeedbackPromptPlaceholder;
