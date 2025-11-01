import React, { useState, useEffect } from 'react';
import { Camera, Plus, Trash2, RefreshCw, LogOut, LogIn } from 'lucide-react';

const mockFetch = (endpoint, payload) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            if (endpoint === '/widgets') {
                resolve([
                    { id: 1, service_name: 'rss', widget_name: 'article_list', config: { link: 'https://news.example.com', number: 5 }, refresh_rate: 60 },
                    { id: 2, service_name: 'weather', widget_name: 'city_temperature', config: { city: 'Abidjan' }, refresh_rate: 60 },
                    { id: 3, service_name: 'time', widget_name: 'current_time', config: { timezone: 'Africa/Abidjan' }, refresh_rate: 60 },
                ]);
            }

            if (endpoint.includes('/rss/fetch')) {
                resolve({
                    feed_title: 'Top News',
                    articles: Array.from({ length: payload.number || 5 }, (_, i) => ({
                        title: `Article ${i + 1} - ${new Date().toLocaleTimeString()}`,
                        link: '#',
                        published: new Date().toLocaleDateString(),
                    })),
                });
            }

            if (endpoint.includes('/weather/fetch')) {
                const temp = Math.floor(24 + Math.random() * 8);
                resolve({
                    city: payload.city,
                    temperature: temp,
                    condition: temp > 28 ? 'Sunny' : 'Cloudy',
                    humidity: Math.floor(40 + Math.random() * 50),
                });
            }

            if (endpoint.includes('/time/fetch')) {
                resolve({
                    timezone: payload.timezone,
                    time: new Date().toLocaleTimeString('fr-FR', { timeZone: 'Africa/Abidjan' }),
                });
            }
        }, 500);
    });
};

function Service() {
    const [token, setToken] = useState(null);
    const [widgets, setWidgets] = useState([]);
    const [showAuth, setShowAuth] = useState(true);
    const [showAddWidget, setShowAddWidget] = useState(false);
    const [authMode, setAuthMode] = useState('login');
    const [widgetData, setWidgetData] = useState({});
    const [selectedService, setSelectedService] = useState('rss');

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [widgetName, setWidgetName] = useState('article_list');
    const [refreshRate, setRefreshRate] = useState(60);
    const [rssLink, setRssLink] = useState('https://news.example.com');
    const [rssNumber, setRssNumber] = useState(5);
    const [weatherCity, setWeatherCity] = useState('Abidjan');
    const [timezone, setTimezone] = useState('Africa/Abidjan');

    useEffect(() => {
        if (token) fetchWidgets();
    }, [token]);

    useEffect(() => {
        if (widgets.length > 0) {
            const interval = setInterval(() => {
                widgets.forEach(refreshWidget);
            }, 30000);
            return () => clearInterval(interval);
        }
    }, [widgets]);

    const fetchWidgets = async () => {
        const data = await mockFetch('/widgets');
        setWidgets(data);
        data.forEach(refreshWidget);
    };

    const refreshWidget = async (widget) => {
        let endpoint = '';
        if (widget.service_name === 'rss') endpoint = '/widgets/rss/fetch';
        if (widget.service_name === 'weather') endpoint = '/widgets/weather/fetch';
        if (widget.service_name === 'time') endpoint = '/widgets/time/fetch';

        const data = await mockFetch(endpoint, widget.config);
        setWidgetData((prev) => ({ ...prev, [widget.id]: data }));
    };

    const handleAuth = async () => {
        if (authMode === 'login') {
            setToken('fake_token_123');
            setShowAuth(false);
        } else {
            alert('Inscription réussie ! Vous pouvez maintenant vous connecter.');
            setAuthMode('login');
        }
        setEmail('');
        setPassword('');
    };

    const addWidget = async () => {
        const config = {};

        if (selectedService === 'rss') {
            config.link = rssLink;
            config.number = rssNumber;
        } else if (selectedService === 'weather') {
            config.city = weatherCity;
        } else if (selectedService === 'time') {
            config.timezone = timezone;
        }

        const newWidget = {
            id: Date.now(),
            service_name: selectedService,
            widget_name: widgetName,
            config,
            refresh_rate: refreshRate,
        };

        setWidgets((prev) => [...prev, newWidget]);
        setShowAddWidget(false);
        refreshWidget(newWidget);
    };

    const deleteWidget = (id) => {
        setWidgets((prev) => prev.filter((w) => w.id !== id));
    };

    const logout = () => {
        setToken(null);
        setShowAuth(true);
        setWidgets([]);
        setWidgetData({});
    };

    useEffect(() => {
        if (selectedService === 'rss') setWidgetName('article_list');
        else if (selectedService === 'weather') setWidgetName('city_temperature');
        else if (selectedService === 'time') setWidgetName('current_time');
    }, [selectedService]);

    //   if (showAuth) {
    //     return (
    //       <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
    //         <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
    //           <div className="text-center mb-8">
    //             <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-600 rounded-full mb-4">
    //               <Camera className="w-8 h-8 text-white" />
    //             </div>
    //             <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
    //             <p className="text-gray-600 mt-2">Your personalized widget dashboard</p>
    //           </div>

    //           <div className="flex gap-2 mb-6">
    //             <button
    //               onClick={() => setAuthMode('login')}
    //               className={`flex-1 py-2 rounded-lg font-medium transition ${
    //                 authMode === 'login' ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
    //               }`}
    //             >
    //               Login
    //             </button>
    //             <button
    //               onClick={() => setAuthMode('register')}
    //               className={`flex-1 py-2 rounded-lg font-medium transition ${
    //                 authMode === 'register' ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
    //               }`}
    //             >
    //               Register
    //             </button>
    //           </div>

    //           <div className="space-y-4">
    //             <div>
    //               <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
    //               <input
    //                 type="email"
    //                 value={email}
    //                 onChange={(e) => setEmail(e.target.value)}
    //                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
    //                 placeholder="your@email.com"
    //               />
    //             </div>
    //             <div>
    //               <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
    //               <input
    //                 type="password"
    //                 value={password}
    //                 onChange={(e) => setPassword(e.target.value)}
    //                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
    //                 placeholder="••••••••"
    //               />
    //             </div>
    //             <button onClick={handleAuth} className="w-full bg-indigo-600 text-white py-3 rounded-lg font-medium hover:bg-indigo-700 transition">
    //               <LogIn className="inline-block mr-2 w-5 h-5" />
    //               {authMode === 'login' ? 'Login' : 'Register'}
    //             </button>
    //           </div>
    //         </div>
    //       </div>
    //     );
    //   }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            <div className="flex items-center justify-between mb-10">
                <h2 className="mt-8 text-3xl font-extrabold leading-tight text-gray-900">Services</h2>
                {/* <p className="mt-12 text-lg text-gray-500">Here is a few of the awesome Services we provide.</p> */}
                {/* modif */}
                <button
                    onClick={() => setShowAddWidget(true)}
                    className="bg-blue-600 mt-8 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                >
                    + Add Widget
                </button>
            </div>
            {/* <button
                onClick={() => setShowAddWidget(true)}
                className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
            >
                <Plus className="w-5 h-5" /> Add Widget
            </button> */}
            {/* <main className="max-w-7xl mx-auto px-4 py-8"> */}
            <main className="container relative flex flex-col justify-between h-full max-w-6xl px-10 xl:px-0 mt-5">

                <div className="w-full">
                    <div className="flex flex-col w-full mb-10 sm:flex-row">
                        <div className="w-full mb-10 sm:mb-4 sm:w-full">
                            <div className="relative h-full ml-0 mr-0 sm:mr-10">
                                <span className="absolute top-0 left-0 w-full h-full mt-1 ml-1 bg-indigo-500 rounded-lg"></span>
                                <div className="relative h-full p-5 bg-white border-2 border-indigo-500 rounded-lg">
                                    <div className="flex items-center -mt-1">
                                        <h3 className="my-2 ml-3 text-lg font-bold text-gray-800">OUR SERVICES</h3>
                                    </div>
                                    <p className="mt-3 mb-1 text-xs font-medium text-indigo-500 uppercase">------------</p>
                                    <p className="mb-2 text-gray-600">Ne ratez plus aucune métrique importante. Notre application met à votre disposition les informations essentielles, où que vous soyez.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="">
                        {widgets.length === 0 ? (

                        <><div className="max-w-sm rounded-lg overflow-hidden shadow-lg bg-white p-6 m-4 transition-all duration-300 hover:shadow-2xl">

                                {/* <div className="flex items-center mb-4"> */}
                                <div className="bg-blue-500 rounded-full p-3 mr-3">

                                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3-3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                </div>
                                <h3 className="text-xl font-bold text-gray-800">Utilisez notre Widget !</h3>

                                <p className="text-gray-600 mb-6">
                                    Intégrez notre widget pour offrir une expérience utilisateur fluide et optimisée.
                                    Accédez à toutes les fonctionnalités depuis votre propre site.
                                </p>
                           <div className="text-center py-16">
                                    <button
                                        onClick={() => setShowAddWidget(true)}
                                        className="inline-flex items-center gap-2 bg-indigo-600 text-white px-1 py-2 rounded-lg hover:bg-indigo-700 transition"
                                    >
                                        <Plus className="w-5 h-5" /> Add Your First Widget
                                    </button>
                                </div>
                                 </div></>



                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {widgets.map((widget) => (
                                    <div key={widget.id} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition">
                                        <div className="flex items-center justify-between mb-4">
                                            <h3 className="text-lg font-semibold text-gray-800 capitalize">
                                                {widget.service_name} - {widget.widget_name.replace(/_/g, ' ')}
                                            </h3>
                                            <div className="flex gap-2">
                                                <button onClick={() => refreshWidget(widget)} className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition">
                                                    <RefreshCw className="w-4 h-4" />
                                                </button>
                                                <button onClick={() => deleteWidget(widget.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition">
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>

                                        <div className="text-sm text-gray-600 space-y-2">
                                            {widget.service_name === 'rss' && widgetData[widget.id] && (
                                                <div>
                                                    <h4 className="font-semibold mb-2">{widgetData[widget.id].feed_title}</h4>
                                                    {widgetData[widget.id].articles?.map((article, idx) => (
                                                        <div key={idx} className="border-b pb-2 mb-2 last:border-b-0">
                                                            <a href={article.link} className="text-indigo-600 hover:underline font-medium">
                                                                {article.title}
                                                            </a>
                                                            <p className="text-xs text-gray-500 mt-1">{article.published}</p>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}

                                            {widget.service_name === 'weather' && widgetData[widget.id] && (
                                                <div className="text-center">
                                                    <p className="text-4xl font-bold text-indigo-600">{widgetData[widget.id].temperature}°C</p>
                                                    <p className="text-lg font-medium mt-2">{widgetData[widget.id].city}</p>
                                                    <p className="text-sm text-gray-500">{widgetData[widget.id].condition}</p>
                                                    <p className="text-xs text-gray-400 mt-1">Humidity: {widgetData[widget.id].humidity}%</p>
                                                </div>
                                            )}

                                            {widget.service_name === 'time' && widgetData[widget.id] && (
                                                <div className="text-center">
                                                    <p className="text-3xl font-mono font-bold text-indigo-600">{widgetData[widget.id].time}</p>
                                                    <p className="text-sm text-gray-500 mt-2">{widgetData[widget.id].timezone}</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </main>

            {showAddWidget && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-2xl p-8 max-w-md w-full max-h-[90vh] overflow-y-auto">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6">Add Widget</h2>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Service</label>
                                <select
                                    value={selectedService}
                                    onChange={(e) => setSelectedService(e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                >
                                    <option value="rss">RSS Feed</option>
                                    <option value="weather">Weather</option>
                                    <option value="time">Time</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Widget Type</label>
                                <select
                                    value={widgetName}
                                    onChange={(e) => setWidgetName(e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                >
                                    {selectedService === 'rss' && <option value="article_list">Article List</option>}
                                    {selectedService === 'weather' && <option value="city_temperature">City Temperature</option>}
                                    {selectedService === 'time' && <option value="current_time">Current Time</option>}
                                </select>
                            </div>

                            {selectedService === 'rss' && (
                                <>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">RSS Feed URL</label>
                                        <input
                                            type="text"
                                            value={rssLink}
                                            onChange={(e) => setRssLink(e.target.value)}
                                            placeholder="https://news.example.com/feed"
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Number of Articles</label>
                                        <input
                                            type="number"
                                            value={rssNumber}
                                            onChange={(e) => setRssNumber(parseInt(e.target.value))}
                                            min="1"
                                            max="20"
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                        />
                                    </div>
                                </>
                            )}

                            {selectedService === 'weather' && (
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                                    <input
                                        type="text"
                                        value={weatherCity}
                                        onChange={(e) => setWeatherCity(e.target.value)}
                                        placeholder="Abidjan"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                    />
                                </div>
                            )}

                            {selectedService === 'time' && (
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Timezone</label>
                                    <input
                                        type="text"
                                        value={timezone}
                                        onChange={(e) => setTimezone(e.target.value)}
                                        placeholder="Africa/Abidjan"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                    />
                                </div>
                            )}

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Refresh Rate (seconds)</label>
                                <input
                                    type="number"
                                    value={refreshRate}
                                    onChange={(e) => setRefreshRate(parseInt(e.target.value))}
                                    min="10"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                />
                            </div>

                            <div className="flex gap-2 pt-4">
                                <button
                                    onClick={() => setShowAddWidget(false)}
                                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={addWidget}
                                    className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
                                >
                                    Add Widget
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Service;