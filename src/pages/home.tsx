import * as Icons from "react-icons/fa6";

import "src/styles/pages/home.css";

const Home = () => {
  return (
    <>
      <div className="stats">
        <div className="row">
          <div className="stat user">
            <img
              src="https://fortnite-api.com/images/cosmetics/br/cid_175_athena_commando_m_celestial/icon.png"
              alt=""
              className="character"
            />
            <div className="welcome">
              <h4>Hi, username!</h4>
              <p>
                There are currently <strong>17</strong> players online, with a
                total of <strong>127</strong> players.
              </p>
            </div>
          </div>
        </div>
        <div className="row wrap">
          <EqualStat
            value="0"
            description="Total Kills"
            icon="FaSkull"
            color="red"
          />
          <EqualStat
            value="0"
            description="Lifetime Wins"
            icon="FaCrown"
            color="yellow"
          />
          <EqualStat
            value="0"
            description="Matches Played"
            icon="FaBook"
            color="blue"
          />
          <EqualStat
            value="0"
            description="Time Played"
            icon="FaClock"
            color="purple"
          />
        </div>
      </div>
    </>
  );
};

type EqualStatProps = {
  value: string;
  description: string;
  icon: keyof typeof Icons;
  color: "red" | "yellow" | "blue" | "purple";
};

const EqualStat = (props: EqualStatProps) => {
  const Icon = Icons[props.icon];

  return (
    <div className="stat equal">
      <div className="information">
        <span className="value">{props.value}</span>
        <small className="description">{props.description}</small>
      </div>
      <div className={"icon " + props.color}>
        <Icon />
      </div>
    </div>
  );
};

export default Home;
