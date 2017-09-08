/**
 * Created by elsa on 2017/3/23.
 */
import ReactDOMServer from 'react-dom/server';
import React from 'react';
import List from './List';

class MyComponent extends React.Component {
  static defaultProps = {
    books: [
      'angular',
      'react',
      'jquery',
      'javascript'
    ],
    companies: [
      'google',
      'facebook',
      'github'
    ]
  };

  /**
   * ReactDOMServer.renderToStaticMarkup(element)方法和ReactDOMServer.renderToString(element)方法类似
   * 不同的是，renderToStaticMarkup方法不会给element创建React内部使用的`data-reactid`属性，擦出了这些属性，
   * 可以节省不少字节。当把React作为一个简单的静态页面生成器的场景，这个方法适用。但不会擦除html标签上自定义的`data-x`属性
   */
  createHtmlMarkupStringOfBookList() {
    const htmlString = ReactDOMServer.renderToStaticMarkup(
      <List items={this.props.books} />
    );
    const htmlMarkup = {
      html: htmlString
    };
    return JSON.stringify(htmlMarkup);
  }

  /**
   * renderToString生成了React内部使用的`data-reactroot`, `data-reactid`等属性
   * @returns {*}
   */
  createHtmlStringOfCompanyList() {
    const htmlString = ReactDOMServer.renderToString(
      <List items={this.props.companies} />
    );
    return htmlString;
  }

  render() {
    //服务器端生成这个htmlMarkup
    const bookListHtmlMarkup = JSON.parse(this.createHtmlMarkupStringOfBookList());
    console.log(bookListHtmlMarkup);
    const companiesHtmlString = this.createHtmlStringOfCompanyList();
    console.log(companiesHtmlString);

    return (
      <div>
        <p>ReactDOMServer.renderToStaticMarkup初探</p>
        <div>
          <p>计算机书籍：</p>
          <div dangerouslySetInnerHTML={{ __html: bookListHtmlMarkup.html }}></div>
        </div>

        <div>
          <p>公司：</p>
          <div dangerouslySetInnerHTML={{ __html: companiesHtmlString }}></div>
        </div>
      </div>
    );
  }
}

export default MyComponent;
