ADDON_NAME = "streetmap.xpi"

SRC    = "src"
BUILD  = "build"

namespace :addon do                                                                                               
  desc "Packages addon as .xpi from source via .jar"
  task :build do |t|
    cd File.join(SRC, 'chrome')
    system "zip -rD #{File.join("..", "..", BUILD, 'chrome', 'chrome.jar')} ."
    cd File.join("..", "..")
    cp File.join(SRC, 'chrome.manifest'), File.join(BUILD)
    cp File.join(SRC, 'install.rdf'), File.join(BUILD)
    cd BUILD
    system "zip -r #{File.join("..", ADDON_NAME)} ."
  end
end

