
const highlight = (cb: (span: HTMLSpanElement) => void) => {
   const sel: any = window.getSelection();
   const selectedText = sel.toString()
   if (!selectedText) {
      return;
   }

   const range = sel.getRangeAt(0);

   const {
      commonAncestorContainer,
      startContainer,
      endContainer,
      startOffset,
      endOffset
   } = range;
   const nodes: any[] = [];

   if (startContainer === endContainer) {
      const uid = Math.random().toString(36).substring(2)
      const span = document.createElement("span");
      cb(span)
      span.setAttribute('data-mark', uid)
      range.surroundContents(span);
      nodes.push(startContainer);
      sel.removeRange(range);
      return [span];
   }

   // get all posibles selected nodes
   function getNodes(childList: any) {
      childList.forEach((node: any) => {
         const nodeSel = sel.containsNode(node, true);
         // if is not selected
         if (!nodeSel) return;
         const tempStr = node.nodeValue;
         if (node.nodeType === 3 && tempStr.replace(/^\s+|\s+$/gm, "") !== "") {
            nodes.push(node);
         }
         if (node.nodeType === 1) {
            if (node.childNodes) getNodes(node.childNodes);
         }
      });
   }

   getNodes(commonAncestorContainer.childNodes);
   const spans: HTMLSpanElement[] = []
   nodes.forEach((node, index, listObj) => {
      const uid = Math.random().toString(36).substring(2)
      const { nodeValue } = node;
      let text, prevText, nextText;

      if (index === 0) {
         prevText = nodeValue.substring(0, startOffset);
         text = nodeValue.substring(startOffset);
      } else if (index === listObj.length - 1) {
         text = nodeValue.substring(0, endOffset);
         nextText = nodeValue.substring(endOffset);
      } else {
         text = nodeValue;
      }

      const span = document.createElement("span");
      cb(span)
      span.setAttribute('data-mark', uid)
      span.append(document.createTextNode(text));
      const { parentNode } = node;

      parentNode.replaceChild(span, node);

      if (prevText) {
         const prevDOM = document.createTextNode(prevText);
         parentNode.insertBefore(prevDOM, span);
      }
      if (nextText) {
         const nextDOM = document.createTextNode(nextText);
         parentNode.insertBefore(nextDOM, span.nextSibling);
      }
      spans.push(span)
   });

   sel.removeRange(range);
   return spans
}



export default highlight