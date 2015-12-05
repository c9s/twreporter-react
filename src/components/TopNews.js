import React, { Component, PropTypes } from 'react'
import Carousel from 'nuka-carousel'
import _ from 'lodash';
if (process.env.BROWSER) {
    require("./TopNews.css");
}

export default class TopNews extends Component {
    mixins: [Carousel.ControllerMixin]
    constructor(props, context) {
        super(props, context)
    }
    handleResize() {
        var currentHeight = window.screen.availHeight;
        var offset = 100;
        if (currentHeight < 800) {
            offset = 290;
        } else {
            offset = 200;
        }
        var available = window.screen.availHeight - offset
        console.log(available);
        var wrapper = document.getElementsByClassName('topnewsimage-wrap')
        for (var i = 0; i < wrapper.length; i++) {
            wrapper[i].style.height = available + 'px'
        }
        var slider = document.getElementsByClassName('slider')
        var sliderHeight = available + 100
        for (var i = 0; i < slider.length; i++) {
            slider[i].style.height = sliderHeight + 'px'
        }
        var carouselItem = document.getElementsByClassName('carousel-item')
        for (var i = 0; i < carouselItem.length; i++) {
            carouselItem[i].style.top = '-' + carouselItem[i].style.height+ 'px'
        }
        var categoryContainer = document.getElementsByClassName('topnews_categorycontainer')
        for (var i = 0; i < categoryContainer.length; i++) {
            categoryContainer[i].style.top = '-' + available + 'px'
        }
    }
    componentDidMount() {
        this.handleResize()
        window.addEventListener('resize', this.handleResize);
    }
    render() {
        const { topnews } = this.props
        let cat_display = "台灣"
        if (topnews && topnews.length > 0) {
            return (
                <Carousel>
                    { _.map(topnews, (a) => {
                        var d = new Date()
                        d.setTime(a.lastPublish*1000)
                        var d_str = d.toISOString().substring(0,10)
                        var url = "https://www.twreporter.org/a/" + a.slug
                        return (
                            <a key={a.id} href={url}>
                                <div className="topnewsimage-wrap">
                                    <img className="carousel-image" src={a.preview_image}/>
                                </div>
                                <div className="topnews_categorycontainer">
                                    <div className="topnews_category">{cat_display.substring(0,1)}</div>
                                    <div className="topnews_category">{cat_display.substring(2,1)}</div>
                                </div>
                                <div className="carousel-item">
                                    <div className="carousel-published">{d_str}</div>
                                    <div className="carousel-itemtitle">{a.title}</div>
                                    <div className="carousel-excerpt">{a.excerpt}</div>
                                 </div>
                            </a>
                        );
                        })
                    }
                </Carousel>
            )
        } else {
            return ( <div></div> )
        } 
    }
}

export { TopNews };

