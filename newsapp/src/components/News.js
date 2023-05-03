import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
  static defaultProps = {
    country: "in",
    category: "general",
    pagesize: 8,
  };

  static propTypes = {
    country: PropTypes.string,
    category: PropTypes.string,
    pagesize: PropTypes.number,
  };

  constructor() {
    super();
    this.state = {
      articles: [],
      loader: false,
      page: 1,
    };
  }

  async componentDidMount() {
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=bd2a2cd5eafa4e1686c91c4f5a893b02&page=${this.state.page}&pagesize=${this.props.pagesize}`;
    this.setState({ loader: true });
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      page: 1,
      loader: false,
    });
  }

  handleNextState = async () => {
    if (
      this.state.page + 1 >
      Math.ceil(this.state.totalResults / this.props.pagesize)
    ) {
    } else {
      let url = `https://newsapi.org/v2/top-headlines?country=${
        this.props.country
      }&category=${
        this.props.category
      }&apiKey=bd2a2cd5eafa4e1686c91c4f5a893b02&page=${
        this.state.page + 1
      }&pagesize=${this.props.pagesize}`;
      this.setState({ loader: true });
      let data = await fetch(url);
      let parsedData = await data.json();
      console.log(parsedData);
      this.setState({
        page: this.state.page + 1,
        articles: parsedData.articles,
        loader: false,
      });
    }
  };

  handlePreviousState = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=${
      this.props.country
    }&category=${
      this.props.category
    }&apiKey=bd2a2cd5eafa4e1686c91c4f5a893b02&page=${
      this.state.page - 1
    }&pagesize=${this.props.pagesize}`;
    this.setState({ loader: true });
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({
      page: this.state.page - 1,
      articles: parsedData.articles,
      loader: false,
    });
  };

  fetchMoreData = async () => {
    this.setState({page: this.state.page + 1})
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=bd2a2cd5eafa4e1686c91c4f5a893b02&page=${this.state.page}&pagesize=${this.props.pagesize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      totalResults: parsedData.totalResults,
    });
  };

  render() {
    return (
      <div className="container my-3">
        <h2 className="text-center">News Mania - Top Headlines</h2>
        {/* {this.state.loader && <Spinner />} */}
        <InfiniteScroll
            dataLength={this.state.articles.length}
            next={this.fetchMoreData}
            hasMore={this.state.articles !== this.state.totalResults}
            loader={<Spinner />}
          >
        <div className="container">

        
        <div className="row">
          
            {
              this.state.articles.map((element) => {
                return (
                  <div className="col-md-4 my-1" key={element.url}>
                    <NewsItem
                      title={element.title}
                      description={element.description}
                      imageUrl={element.urlToImage}
                      newsUrl={element.url}
                      author={element.author}
                      date={element.publishedAt}
                    />
                  </div>
                );
              })}
        </div>
        </div>
        </InfiniteScroll>
        <div className="d-flex justify-content-between my-2">
          <button
            disabled={this.state.page <= 1}
            type="button"
            className="btn btn-dark"
            onClick={this.handlePreviousState}
          >
            {" "}
            &larr; Previous
          </button>
          <button
            disabled={
              this.state.page + 1 >
              Math.ceil(this.state.totalResults / this.props.pagesize)
            }
            type="button"
            className="btn btn-dark"
            onClick={this.handleNextState}
          >
            Next &rarr;
          </button>
        </div>
      </div>
    );
  }
}

export default News;
