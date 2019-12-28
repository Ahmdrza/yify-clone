import React, {Component} from 'react';
import { Row, Col, Modal, Button, List, Avatar, Icon, Tag, Tabs, Divider, Descriptions, Badge } from 'antd';
const { TabPane } = Tabs;
import img from '../../../public/magnet.svg';
export default class MovieDetail extends Component {
    constructor(props) {
        super(props);
        this.state={
            visible: this.props.visible,
        }
        this.handleCancel = this.handleCancel.bind(this);
        this.getMangetLink = this.getMangetLink.bind(this);
    }

    componentDidUpdate(prevProps) {
        if(prevProps.visible !== this.props.visible) {
          this.setState({
              visible: this.props.visible,
            });
        }
    }

    handleCancel(){
        this.props.hideModal();
    };

    getMangetLink(torrent) {
        return `magnet:?xt=urn:btih:${torrent.hash}&dn=${this.props.slug}
                        &tr=http://track.one:1234/announce
                        &tr=udp://track.two:80
                        &tr=udp://open.demonii.com:1337/announce
                        &tr=udp://tracker.openbittorrent.com:80
                        &tr=udp://tracker.coppersurfer.tk:6969
                        &tr=udp://glotorrents.pw:6969/announce
                        &tr=udp://tracker.opentrackr.org:1337/announce
                        &tr=udp://torrent.gresille.org:80/announce
                        &tr=udp://p4p.arenabg.com:1337
                        &tr=udp://tracker.leechers-paradise.org:6969
                        `;
    }

    render() {
        return (
            <div>
                {
                    (this.props.visible) ? (
                        <Modal
                            title={<a href={'https://www.google.com/search?q='+this.props.title_long.replace(/ /g, '+')} target="_blank">{this.props.title_long}</a>}
                            visible={this.state.visible}
                            onCancel={this.handleCancel}
                            width={850}
                            style={{ top: 20 }}
                            footer={[
                                <Button key="Close" onClick={this.handleCancel}>
                                  Close
                                </Button>
                            ]}
                            >
                            <Row>
                                <Col xs={24} sm={10} md={10} lg={10} className="movie-detail-image-wrapper">
                                    <Avatar shape="square" size={450} src={this.props.large_cover_image} alt={this.props.title_long} />
                                </Col>
                                <Col xs={24} sm={14} md={14} lg={14}>
                                    <Tabs defaultActiveKey="1">
                                        <TabPane tab="Info" key="1">
                                        <b>Genres: </b>
                                        {

                                            this.props.genres.map((genre, index) => (
                                            <Tag key={index}>{genre}</Tag>
                                            ))
                                        }
                                        <br/>
                                        <b>Language: </b>{this.props.language}
                                        <Divider />
                                        {this.props.description_full}
                                        </TabPane>
                                        <TabPane tab="Torrents" key="2">
                                        {
                                        this.props.torrents.map((torrent, index) => (
                                            <span key={index}>
                                                <Descriptions title={<Badge status="success" text={torrent.quality}/>} bordered={false} size="small">
                                                    <Descriptions.Item label="Size">{torrent.size}</Descriptions.Item>
                                                    <Descriptions.Item label="Seeds"><Icon style={{ color: 'green' }} type="arrow-up" /> {torrent.seeds}</Descriptions.Item>
                                                    <Descriptions.Item label="Peers"><Icon style={{ color: 'red' }} type="arrow-down" /> {torrent.peers}</Descriptions.Item>
                                                    <Descriptions.Item label="Torrent"><a href={torrent.url}><Icon type="download" /></a></Descriptions.Item>
                                                    <Descriptions.Item label="Magnet"><a className="magnet-link" href={this.getMangetLink(torrent)}><img src="/public/magnet.svg" /></a></Descriptions.Item>
                                                </Descriptions>
                                                <Divider />
                                            </span>
                                        ))
                                        }
                                        </TabPane>
                                    </Tabs>
                                </Col>
                            </Row>
                            
                        </Modal>
                    )
                    :''
                }
            </div>
        )
    }
}