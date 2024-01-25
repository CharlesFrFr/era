import { useMe } from "src/state/me";
import { useServers } from "src/state/servers";
import moment from "moment";

import { Link } from "@tanstack/react-router";
import * as Icons from "react-icons/fa6";

import "src/styles/stats.css";

const UserStats = () => {
  const me = useMe();
  const servers = useServers((state) => state.servers);
  const nonMap = Object.values(Object.fromEntries(servers)).filter(
    (server) => server.status === "online" && !server.private
  );
  const players = nonMap.reduce(
    (acc, server) => acc + server.number_of_players,
    0
  );

  if (!me.loaded || me.era.uuid === "") return null;

  return (
    <div className="stats">
      <div className="row">
        <div className="stat user">
          <img
            src={
              me.era.character.icon ??
              "https://fortnite-api.com/images/cosmetics/br/cid_175_athena_commando_m_celestial/icon.png"
            }
            alt=""
            className="character"
          />
          <div className="welcome">
            <h4>Hi, {me.era.username}!</h4>
            <p>
              There are currently <strong>{nonMap.length}</strong> servers
              online, with a total of <strong>{players}</strong> players.
            </p>
          </div>
        </div>
        <div className="links">
          <StatLink
            icon="FaBook"
            description="Match History"
            path="/app/profile"
          />
          <StatLink
            icon="FaMedal"
            description="Leaderboards"
            path="/app/leaderboards"
          />
        </div>
      </div>
      <div className="row wrap">
        <EqualStat
          value={me.stats.kdr.toString()}
          description="Kill/Death Ratio"
          icon="FaSkull"
          color="red"
        />
        <EqualStat
          value={me.stats.wins.toString()}
          description="Lifetime Wins"
          icon="FaCrown"
          color="yellow"
        />
        <EqualStat
          value={me.stats.matches.toString()}
          description="Matches Played"
          icon="FaBook"
          color="blue"
        />
        <EqualStat
          value={moment.utc(me.stats.time * 1000).format("hh:mm:ss")}
          description="Time Played"
          icon="FaClock"
          color="purple"
        />
      </div>
    </div>
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

type StatLinkProps = {
  icon: keyof typeof Icons;
  description: string;
  path: string;
};

const StatLink = (props: StatLinkProps) => {
  const Icon = Icons[props.icon];

  return (
    <Link to={props.path} className="stat link">
      <div className="image">
        <Icon />
      </div>
      <div className="information">
        <span className="description">{props.description}</span>
      </div>
      <div className="chevron">
        <Icons.FaChevronRight />
      </div>
    </Link>
  );
};

export default UserStats;
