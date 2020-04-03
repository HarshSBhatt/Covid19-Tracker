import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Card, Skeleton, Empty } from 'antd';
import Moment from 'react-moment';
import Footer from '../Footer';
import { Link } from 'react-router-dom';
import Helmet from 'react-helmet';

const { Meta } = Card;

function News() {
    const [fetched, setFetched] = useState(false);
    const [loading, setLoading] = useState(true);
    const [news1, setNews1] = useState([])
    const [news2, setNews2] = useState([])
    useEffect(() => {
        window.scroll(0, 0)
        if (fetched === false) {
            getNews();
        }
    }, [fetched])
    // const url = 'http://newsapi.org/v2/everything?' + 'q=corona+covid19+covid-19&' + 'from=2020-04-02&' + 'sortBy=popularity&' + 'apiKey=481ac3f09e5b4be58767b8d08554eb8d'
    const url1 = 'https://newsapi.org/v2/top-headlines?q=covid-19&country=in&apiKey=481ac3f09e5b4be58767b8d08554eb8d'
    const url2 = 'https://newsapi.org/v2/top-headlines?q=corona&country=in&apiKey=481ac3f09e5b4be58767b8d08554eb8d'
    const getNews = async () => {
        try {
            const [response1, response2] = await Promise.all([
                axios.get(url1),
                axios.get(url2)
            ]);
            setFetched(true);
            setLoading(false);
            setNews1(response1.data.articles)
            setNews2(response2.data.articles)
        } catch (err) {
            console.log(err);
        }
    };
    news2 && news1.push(...news2)
    const newsSet = new Set(news1)
    const news3 = [...newsSet]

    // if (loading) return <Loader message='Fetching Latest News' />;
    return (
        <React.Fragment>
            <Helmet>
                <meta charSet='UTF-8' />
                <title>COVID19 Latest News</title>
                <meta name='description' content='Get all live news of novel corona virus' />
                <meta name='viewport' content='width=device-width, initial-scale=1' />
            </Helmet>
            <div className='news-header anim'>COVID19 LATEST NEWS</div>
            <div className='news-wrapper anim' style={{ minHeight: window.innerHeight }}>
                {news3.length ? news3.map((news, key) => (
                    <a href={news.url} target="_blank" rel="noopener noreferrer" key={key}>
                        <Card
                            loading={loading}
                            style={{ width: 400 }}
                            className='news'
                            hoverable
                            extra={`Source: ${news && news.source.name}    `}
                            cover={

                                <Skeleton loading={loading} active>
                                    {
                                        news && news.urlToImage
                                            ?
                                            <img
                                                alt="example"
                                                src={news.urlToImage}
                                            />
                                            :
                                            <img
                                                alt="example"
                                                src={require('../../assets/no-image.jpg')}
                                            />
                                    }
                                </Skeleton>
                            }
                        >
                            <Skeleton loading={loading} active>
                                <Meta
                                    title={news && news.title}
                                    description={news && news.description}
                                />
                            </Skeleton>
                            <Moment fromNow>{news && news.publishedAt}</Moment>
                        </Card>
                    </a>
                ))
                    :
                    <Empty
                        description={
                            <React.Fragment>
                                <span>Currently no news available</span>
                                <span>Check after some time</span>
                                <span style={{ fontSize: 20 }}><Link to="/">Go to Home</Link></span>
                            </React.Fragment>
                        }
                    />
                }
            </div>
            <div className='source'>Source: <a href='https://www.newsapi.org/' target="_blank" rel="noopener noreferrer">News API</a></div>
            <Footer />
        </React.Fragment>
    )
}

export default News
