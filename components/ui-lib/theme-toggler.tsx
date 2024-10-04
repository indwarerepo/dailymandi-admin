import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { MoonStar, SunIcon } from "lucide-react";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { setTheme, theme, systemTheme } = useTheme();
  const [themeType, setThemeType] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (theme == "system") {
      setThemeType(systemTheme);
    } else {
      setThemeType(theme);
    }
  }, [theme, systemTheme]);

  const toggleTheme = () => {
    const newTheme = themeType === "dark" ? "light" : "dark";
    setTheme(newTheme);
    setThemeType(newTheme);
  };

  return (
    <Button
      variant="outline"
      size="icon"
      className="outline-none w-[1.5rem] h-[1.5rem] rounded-full focus-visible:ring-0 focus-visible:ring-offset-0 bg-inherit hover:bg-inherit cursor-pointer border-0"
      onClick={toggleTheme}
    >
      {themeType === "dark" ? (
        <SunIcon className="h-[24px] w-[24px] text-topbarForeground" />
      ) : (
        <MoonStar className="h-[24px] w-[24px] text-topbarForeground" />
      )}
    </Button>
  );
}
