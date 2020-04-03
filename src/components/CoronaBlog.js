import React, { useEffect } from 'react';
import { Tabs } from 'antd';
import Helmet from 'react-helmet';
import Footer from './Footer';
const { TabPane } = Tabs;

function CoronaBlog() {
    useEffect(() => {
        window.scroll(0, 0)
    }, [])
    return (
        <React.Fragment>
            <div className="about_corona animY">
                <Helmet>
                    <meta charSet="UTF-8" />
                    <title>Stay Home, Stay Safe!</title>
                    <meta name="description" content="Information related to novel corona virus with symptoms" />
                    <meta name="viewport" content="width=device-width, initial-scale=1" />
                </Helmet>
                <Tabs defaultActiveKey="1" size="large">
                    <TabPane tab="Overview" key="1">
                        <div className="content_blog">
                            <p>
                                Coronavirus disease (COVID-19) is an infectious disease caused by a newly discovered
                                coronavirus.
						</p>
                            <br />
                            <p>
                                {' '}
							Most people infected with the COVID-19 virus will experience mild to moderate respiratory
							illness and recover without requiring special treatment. Older people, and those with
							underlying medical problems like cardiovascular disease, diabetes, chronic respiratory
							disease, and cancer are more likely to develop serious illness.
						</p>
                            <br />
                            <p>
                                The best way to prevent and slow down transmission is be well informed about the COVID-19
                                virus, the disease it causes and how it spreads. Protect yourself and others from infection
                                by washing your hands or using an alcohol based rub frequently and not touching your face.
						</p>
                            <br />
                            <p>
                                The COVID-19 virus spreads primarily through droplets of saliva or discharge from the nose
                                when an infected person coughs or sneezes, so it’s important that you also practice
                                respiratory etiquette (for example, by coughing into a flexed elbow).
						</p>
                            <br />
                            <p>
                                {' '}
							At this time, there are no specific vaccines or treatments for COVID-19. However, there are
							many ongoing clinical trials evaluating potential treatments. WHO will continue to provide
							updated information as soon as clinical findings become available.
						</p>
                        </div>
                    </TabPane>
                    <TabPane tab="Prevention" key="2">
                        <div className="content_blog">
                            <p className='blog_heading'>To prevent infection and to slow transmission of COVID-19, do the following:</p>
                            <li>
                                Wash your hands regularly with soap and water, or clean them with alcohol-based hand rub.
						</li>
                            <li>Maintain at least 1 metre distance between you and people coughing or sneezing.</li>
                            <li>Avoid touching your face.</li>
                            <li>Cover your mouth and nose when coughing or sneezing.</li>
                            <li>Stay home if you feel unwell.</li>
                            <li>Refrain from smoking and other activities that weaken the lungs.</li>
                            <li>
                                Practice physical distancing by avoiding unnecessary travel and staying away from large
                                groups of people.
						</li>
                        </div>
                    </TabPane>
                    <TabPane tab="Symptoms" key="3">
                        <div className="content_blog">
                            <p>
                                The COVID-19 virus affects different people in different ways. COVID-19 is a respiratory
                                disease and most infected people will develop mild to moderate symptoms and recover without
                                requiring special treatment. People who have underlying medical conditions and those over 60
                                years old have a higher risk of developing severe disease and death.
						</p>
                            <span className="listOfBlog">
                                <p>Common symptoms include:</p>
                                <li>Fever</li>
                                <li>Tiredness</li>
                                <li>Dry Cough</li>
                                <br />
                                <p>Other symptoms include:</p>
                                <li>shortness of breath</li>
                                <li>aches and pains</li>
                                <li>sore throat</li>
                                <li>very few people will report diarrhoea, nausea or a runny nose</li>
                            </span>
                            <span>
                                <br />
                                <p>
                                    People with mild symptoms who are otherwise healthy should self-isolate and contact
                                    their medical provider or a COVID-19 information line for advice on testing and
                                    referral.
							</p>
                                <p>
                                    People with fever, cough or difficulty breathing should call their doctor and seek
                                    medical attention.
							</p>
                            </span>
                        </div>
                    </TabPane>
                </Tabs>
            </div>
            <div className='info_source'>
                Source: <a href='https://www.who.int/health-topics/coronavirus'>https://www.who.int/health-topics/coronavirus</a>
            </div>
            <Footer />
        </React.Fragment>
    );
}

export default CoronaBlog;
