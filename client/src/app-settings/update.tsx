import { STATE, UpdateStatus } from "../app-interface";

export default function UpdateButton({
  updateStatus,
  update,
}: {
  updateStatus: UpdateStatus | null;
  update: () => void;
}) {
  const current = `Last updated: ${
    updateStatus?.currentDate
      ? Intl.DateTimeFormat([], { dateStyle: "medium" }).format(
          Date.parse(updateStatus.currentDate)
        )
      : "never"
  }`;
  let button, info;
  if (!updateStatus || updateStatus?.state === STATE.init) {
    info = "Checking for updates";
  }
  if (updateStatus?.state === STATE.nothing) {
    info = "Your content is up to date";
    button = <button disabled>Up to date</button>;
  }
  if (updateStatus?.state === STATE.updateAvailable) {
    info = "Update available";
    button = <button onClick={update}> Update now</button>;
  }
  if (updateStatus?.state === STATE.downloading) {
    info = "Update in progress…";
    button = <button>Downloading {updateStatus?.progress}%</button>;
  }
  if (updateStatus?.state === STATE.unpacking) {
    info = "Update in progress…";
    button = <button>Extracting {updateStatus?.progress}%</button>;
  }
  if (updateStatus?.state === STATE.clearing) {
    info = "Clearing…";
  }

  return (
    <>
      <h4>Update status</h4>
      <span>
        {current}
        <br />
        {info}
      </span>
      {button}
    </>
  );
}
