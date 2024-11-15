// // components/CodeBlock.js
// import { useEffect } from 'react';
// import Prism from 'prismjs';
// import 'prismjs/components/prism-javascript';
//
// const CodeBlock = ({ code, language = 'javascript' }) => {
//   useEffect(() => {
//     Prism.highlightAll();
//   }, [code]);
//
//   const copyToClipboard = () => {
//     navigator.clipboard.writeText(code).then(() => {
//       alert('Code copied to clipboard!');
//     });
//   };
//
//   return (
//     <div style={{ position: 'relative' }}>
//   <button onClick={copyToClipboard} style={{ position: 'absolute', right: 0, top: 0 }}>
//   Copy
//   </button>
//   <pre>
//   <code className={`language-${language}`}>{code}</code>
//   </pre>
//   </div>
// );
// };
//
// export default CodeBlock;
