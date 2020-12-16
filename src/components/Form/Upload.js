import React from "react";
import PropTypes from "prop-types";
import { IonButton, isPlatform } from "@ionic/react";
import { Plugins, CameraResultType } from "@capacitor/core";
import { dataURItoBlob } from "../../utils/file";
import "./Upload.css";
import { defineCustomElements } from "@ionic/pwa-elements/loader";

const { Camera } = Plugins;

const Upload = ({ onChange, placeholder, files, multiple, ...rest }) => {
  const handleSelectFile = async (evt) => {
    if (isPlatform("mobile")) {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.DataUrl,
      });
      const blob = dataURItoBlob(image.dataUrl);
      onChange([blob]);
    } else {
      onChange([...evt.target.files]);
    }
  };

  return (
    <div className="file-input-container">
      {isPlatform("mobile") && (
        <input
          onChange={handleSelectFile}
          id="file"
          type="file"
          className="file-input"
          accept="image/*"
          multiple={multiple}
        />
      )}
      <IonButton color="medium" onClick={handleSelectFile} {...rest}>
        {files.length ? `${files.length} file selected` : placeholder}
      </IonButton>
    </div>
  );
};

// Call the element loader after the platform has been bootstrapped in index.js

Upload.propTypes = {
  multiple: PropTypes.bool,
  files: PropTypes.array,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
};

export default Upload;
