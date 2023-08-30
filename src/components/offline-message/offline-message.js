import { Offline } from 'react-detect-offline';
import './offline-message.scss';

function OfflineMessage() {
	return (
		<Offline polling={{ enabled: false }}>
			<div className="offline-message">
				<span>
					Нет соединения с интернетом.
					<br />
					<br />
					Проверьте интернет соединение и настройку VPN для работы с сервисом
				</span>
			</div>
		</Offline>
	);
}

export default OfflineMessage;
