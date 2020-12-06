import React from 'react'
import Searchbar from './components/Searchbar'
import Sidebar from './components/Sidebar'
import WeeklyReportsAbstracts from './components/weeklyReportsAbstracts'
import WeeklyReportDetail from './components/weeklyReportDetail'
import SettingPresentor from './setting/SettingPresentor'
import Amplify, { API, graphqlOperation } from "aws-amplify"
import awsmobile from './aws-exports';
import cognitoConfig from './cognito-config'
//Amplify.configure(awsmobile);
Amplify.configure(cognitoConfig)

const Home: React.FC = () => {
  return (
    <div className="h-full">
      {/*<SettingPresentor />*/}
      <section className="flow-root overflow-hidden flex items-center justify-center">
        <div className="w-full border shadow flex block bg-channel-searchbar ">
          <Searchbar />
        </div>
      </section>
      <section className="h-screen flow-root overflow-hidden flex items-center justify-center">
        <div className="h-screen w-screen border shadow flex block">
            {/* settings and channels */}
            <div className="sidebar w-2/12">
              <Sidebar />
            </div>
            {/*<!-- Chat content(titles) -->*/}
            <div className="weeklyreport-titles w-5/12 ">
              <WeeklyReportsAbstracts />
            </div>
            {/*<!-- Chat content(Details) -->*/}
            <div className="weeklyreport-detail w-7/12 ">
              <WeeklyReportDetail />
            </div>
        </div>
      </section>

    </div>
      
  );
}

export default Home;
