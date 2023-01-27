import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import Theme from './theme/theme';
import { Amplify } from 'aws-amplify';
import awsconfig from './aws-exports';
import { QueryClient, QueryClientProvider } from 'react-query';

Amplify.configure(awsconfig);

const queryClient = new QueryClient();

ReactDOM.render(
	<React.StrictMode>
		<Theme>
			<QueryClientProvider client={queryClient}>
				<App />
			</QueryClientProvider>
		</Theme>
	</React.StrictMode>,
	document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
