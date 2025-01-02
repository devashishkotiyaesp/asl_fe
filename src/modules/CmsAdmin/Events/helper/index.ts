export const isEmptyHtmlString = (htmlStr: string) => {
  const topicDiv = document.createElement('div');
  topicDiv.innerHTML = htmlStr;
  return !topicDiv.innerText.trim();
};
