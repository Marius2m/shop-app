import { Spin } from "antd"
import { SyncOutlined } from '@ant-design/icons'

import styles from './LoadingIndicator.module.scss'

type LoadingIndicatorSize = (
    | 'small'
    | 'medium'
    | 'large'
)

const LoadingIndicator: React.FC<{ size?: LoadingIndicatorSize}> = ({ size }) => {
    let fontSize = 18
    if (size === 'medium') {
        fontSize = 36
    } else if (size === 'large') {
        fontSize = 72
    }

    const antIcon = <SyncOutlined style={{ fontSize }} spin />;

    return (
        <Spin className={styles.indicator} indicator={antIcon} />
    )
}

export default LoadingIndicator