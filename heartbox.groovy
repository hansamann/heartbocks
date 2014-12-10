def access_token = '91f3b8b79ca16fa418c39b34a0ccfab8011a25d6'
def device = '53ff70066667574852492367'
def url = "https://api.spark.io/v1/devices/${device}/heart"
def con = url.toURL().openConnection()


con.doOutput = true
con.outputStream << "access_token=${access_token}&args=r"
println con.inputStream.text