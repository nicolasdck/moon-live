export interface ApodResponse {
	date: string;
	title: string;
	explanation: string;
	url: string;
	hdurl?: string;
	media_type: 'image' | 'video';
	copyright?: string;
	service_version: string;
}
