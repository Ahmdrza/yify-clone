import React, {Component} from 'react';
import { Modal, Button} from 'antd';

const TrailerModal = ({visible, handleCancel, videoId}) => (
    <Modal
    title=""
    visible={visible}
    onCancel={handleCancel}
    width={610}
    style={{ top: 20 }}
    footer={[
        <Button key="Close" onClick={handleCancel}>
            Close
        </Button>
    ]}
    >
        {
            (videoId) ?
            <>
            <br/>
            <iframe 
            width="560" 
            height="315" 
            src={`https://www.youtube.com/embed/${videoId}`} 
            frameBorder="0" 
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" 
            allowFullScreen>
            </iframe>
            </>
            : null
        }
        
    </Modal>
);

export default TrailerModal;