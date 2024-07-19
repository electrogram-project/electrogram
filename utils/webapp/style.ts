export const style = `        
body {
  --bg-color: var(--tg-theme-bg-color, #fff);
  font-family: sans-serif;
  background-color: var(--bg-color);
  color: var(--tg-theme-text-color, #222);
  font-size: 14px;
  margin: 0;
  padding: 0;
  color-scheme: var(--tg-color-scheme);
}

body.gray {
  background-color: var(--tg-theme-secondary-bg-color, #efefef);
}

a {
  color: var(--tg-theme-link-color, #2678b6);
}

.btn {
  font-size: 14px;
  padding: 10px 17px;
}

.btn-primary {
  background-color: var(--tg-theme-button-color, #50a8eb);
  color: var(--tg-theme-button-text-color, #fff);
  border: none;
}

button {
  display: block;
  width: 100%;
  font-size: 14px;
  margin: 15px 0;
  padding: 12px 20px;
  border: none;
  border-radius: 4px;
  background-color: var(--tg-theme-button-color, #50a8eb);
  color: var(--tg-theme-button-text-color, #ffffff);
  cursor: pointer;
}

.main-container {
  padding: 15px;
}

.list-header {
  text-transform: uppercase;
  font-size: .92em;
  color: var(--tg-theme-hint-color, #ccc);
  margin: 0 0 10px;
}

a.list-group-item,
button.list-group-item {
  color: var(--tg-theme-text-color, #222);
}

.main-container p {
  margin: 0 0 10px;
}

.main-container pre,
.main-container > .btn {
  margin: 0 0 7px;
}

.main-container pre + .hint,
.main-container > .btn + .hint {
  text-align: center;
  margin: 0 0 15px;
}

button[disabled] {
  opacity: 0.6;
  cursor: auto;
  pointer-events: none;
}

button.close_btn {
  /*position: fixed;*/
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 0;
  margin: 0;
  padding: 16px 20px;
  text-transform: uppercase;
}

select {
  display: block;
  box-sizing: border-box;
  font-size: 14px;
  width: 100%;
  padding: 12px 20px;
  margin: 15px 0;
  border: 1px solid var(--tg-theme-link-color, #000);
  background-color: var(--tg-theme-bg-color, #ffffff);
  border-radius: 4px;
  color: var(--tg-theme-text-color, #222222);
  text-align: start;
}

textarea {
  display: block;
  box-sizing: border-box;
  font-size: 14px;
  width: 100%;
  padding: 12px 20px;
  margin: 15px 0;
  border: 1px solid var(--tg-theme-link-color, #000);
  background-color: var(--tg-theme-bg-color, #ffffff);
  border-radius: 4px;
  color: var(--tg-theme-text-color, #222222);
  text-align: start;
}

input[type="text"],
.input[contenteditable] {
  display: block;
  box-sizing: border-box;
  font-size: 14px;
  width: 100%;
  padding: 12px 20px;
  margin: 15px 0;
  border: 1px solid var(--tg-theme-link-color, #000);
  background-color: var(--tg-theme-bg-color, #ffffff);
  border-radius: 4px;
  color: var(--tg-theme-text-color, #222222);
  text-align: start;
}

input:disabled {
  opacity: 0.6;
  cursor: auto;
  pointer-events: none;
}

input[type="text"]::-webkit-input-placeholder {
  color: var(--tg-theme-hint-color, #ccc);
}

input[type="text"]::-moz-placeholder {
  color: var(--tg-theme-hint-color, #ccc);
}

input[type="text"]:-ms-input-placeholder {
  color: var(--tg-theme-hint-color, #ccc);
}

.input[data-placeholder] {
  position: relative;
}

.input[data-placeholder]:empty:before {
  position: absolute;
  left: 0;
  right: 0;
  content: attr(data-placeholder);
  color: var(--tg-theme-hint-color, #ccc);
  padding: 0 20px;
  font-weight: normal;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  pointer-events: none;
  z-index: -1;
}

section {
  padding: 10px;
  text-align: start;
  border: 1px solid var(--tg-theme-link-color, #000);
  border-radius: 4px;
  background-color: var(--bg-color, #ffffff);

}

section#top_sect {
  background-color: var(--tg-theme-bg-color, #ffffff);
}

section#top_sect.second {
  background-color: var(--tg-theme-secondary-bg-color, #efefef);
}

section .sect_row {
  margin: 10px 0;
}

section + section {
  padding: 0 15px 65px;
}

p {
  margin: 40px 0 15px;
}

ul {
  text-align: left;
}

li {
  color: var(--tg-theme-hint-color, #a8a8a8);
}

textarea {
  width: 100%;
  box-sizing: border-box;
  padding: 7px;
}

pre {
  background: rgba(0, 0, 0, .07);
  color: var(--tg-theme-text-color, #222);
  font-size: 12px;
  border: none;
  border-radius: 4px;
  padding: 8px;
  margin: 7px 0;
  word-break: break-word;
  white-space: pre-wrap;
  text-align: left;
}

.dark pre {
  background: rgba(255, 255, 255, .15);
}

.chat_img {
  width: 30px;
  border-radius: 15px;
  margin-right: 10px;
}

.columns {
  display: flex;
}

.columns > * {
  flex-grow: 1;
}

.hint {
  font-size: .8em;
  color: var(--tg-theme-hint-color, #a8a8a8);
}

.ok {
  color: green;
}

.err {
  color: red;
}

.status_need {
  display: none;
}

#fixed_wrap {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  transform: translateY(100vh);
}

.viewport-container {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  height: var(--tg-viewport-stable-height, 100vh);
  transition: height .2s ease;
}

.viewport-container .main-container {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

.viewport-container .main-container button {
  width: auto;
}

.viewport-border,
.viewport-stable_border {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  height: var(--tg-viewport-height, 100vh);
  pointer-events: none;
}

.viewport-stable_border {
  height: var(--tg-viewport-stable-height, 100vh);
}

.viewport-border:before,
.viewport-stable_border:before {
  content: attr(text);
  display: inline-block;
  position: absolute;
  background: gray;
  right: 0;
  top: 0;
  font-size: 7px;
  padding: 2px 4px;
  vertical-align: top;
}

.viewport-stable_border:before {
  background: green;
  left: 0;
  right: auto;
}

.viewport-border:after,
.viewport-stable_border:after {
  content: '';
  display: block;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  border: 2px dashed gray;
}

.viewport-stable_border:after {
  border-color: green;
}

small {
  font-size: 12px;
}
`;
