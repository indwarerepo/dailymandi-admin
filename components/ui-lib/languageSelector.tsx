import React, { useEffect } from "react";

const LanguageSelector = () => {
  const removePoweredByText = () => {
    const gadgetDiv = document.querySelector(".skiptranslate.goog-te-gadget");
    if (gadgetDiv) {
      const childNodes = gadgetDiv.childNodes;
      childNodes.forEach((childNode) => {
        if (
          childNode.nodeType === Node.TEXT_NODE &&
          childNode.textContent?.trim() === "Powered by"
        ) {
          childNode.parentNode?.removeChild(childNode);
        }
      });
    }
  };

  const googleTranslateElementInit = () => {
    new (window as any).google.translate.TranslateElement(
      {
        pageLanguage: "en",
        autoDisplay: false,
      },
      "google_translate_element"
    );

    removePoweredByText();
  };

  useEffect(() => {
    const addScript = document.createElement("script");
    addScript.src =
      "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    document.body.appendChild(addScript);

    (window as any).googleTranslateElementInit = googleTranslateElementInit;

    return () => {
      document.body.removeChild(addScript);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div id="google_translate_element" className="mb-4"></div>;
};

export default LanguageSelector;
