import React from 'react'
import moment from 'moment';
import { RichText } from '@graphcms/rich-text-react-renderer';

const PostDetail = ({ post }) => {

  // const content = {
  //   children: [
  //     {
  //       type: 'paragraph',
  //       children: [
  //         {
  //           bold: true,
  //           text: 'Hello World!',
  //         },
  //       ],
  //     },
  //   ],
  // };
  
  // const App = () => {
  //   return (<RichText 
  //     content={content}
  //     renderers={{
  //       h1: ({ children }) => <h1 className="text-white">{children}</h1>,
  //       bold: ({ children }) => <strong>{children}</strong>,

  //     }} />)
  // };

  

  const getContentFragment = (index, text, obj, type) => {
    let modifiedText = text;

    if (obj) {
      if (obj.bold) {
        modifiedText = (<b key={index}>{text}</b>);
      }

      if (obj.italic) {
        modifiedText = (<em key={index}>{text}</em>);
      }

      if (obj.underline) {
        modifiedText = (<u key={index}>{text}</u>);
      }
    }
    switch (type) {
      case 'heading-three':
        return <h3 key={index} className="text-xl font-semibold mb-4">{modifiedText.map((item, i) => <React.Fragment key={i}>{item}</React.Fragment>)}</h3>;
      case 'paragraph':
        return <p key={index} className="mb-8">{modifiedText.map((item, i) => <React.Fragment key={i}>{item}</React.Fragment>)}</p>;
      case 'heading-four':
        return <h4 key={index} className="text-md font-semibold mb-4">{modifiedText.map((item, i) => <React.Fragment key={i}>{item}</React.Fragment>)}</h4>;
      case 'iframe':
        return (
        <iframe 
          key={index} 
          src={obj.url} 
          title={obj.title} 
          className="mx-auto h-auto md:h-96 w-full"
          />);
      case 'image':
        return (
          <img
            key={index}
            alt={obj.title}
            height={obj.height}
            width={obj.width}
            src={obj.src}
            className="mx-auto"
          />
        );
      default:
        return modifiedText;
    }
  };
  console.log(post.content.raw.children)

  return (
    <>
    <div className="bg-white bg-opacity-70  shadow-lg lg:p-8 pb-12 mb-4">
      <div className="relative overflow-hidden mb-6 p-4">
      <img src={post.coverImage.url} alt="" className="object-top h-full w-full object-cover bg-opacity-70  shadow-lg rounded-t-lg lg:rounded-lg" />
        <div className="px-4 lg:px-0">
          <div className=" flex items-center w-full">

            <div className="font-medium text-gray-700 my-4 justify-content-center bg-opacity-50">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 inline mr-2 text-lime-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="align-middle">{moment(post.createdAt).format('MMM DD, YYYY')}</span>
            </div>

          </div>
          
          <h1 className="font-playfair mb-8 text-3xl font-semibold text-center">{post.title}</h1>

          <div className="p-4">
          {post.content.raw.children.map((typeObj, index) => {
            const children = typeObj.children.map((item, itemindex) => getContentFragment(itemindex, item.text, item));
          
            return getContentFragment(index, children, typeObj, typeObj.type);
          })}
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default PostDetail

