import { motion } from "framer-motion";

const Info = () => {
  return (
    <div className="min-h-screen bg-gray-200 font-custom">
      <div className="container mx-auto px-4 py-4 sm:py-8">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-black mb-4">
            How to use your ARK NFC Card
          </h1>
        </div>

        {/* Main Content */}
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-12">
            
            {/* Android Section */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-lg p-4 sm:p-6 lg:p-8 shadow-sm"
            >
              <h2 className="text-xl sm:text-2xl font-bold text-black mb-4 sm:mb-6 underline">
                FOR ANDROID
              </h2>
              
              {/* Android Phone Illustration */}
              <div className="relative mb-6 sm:mb-8 flex justify-center">
                <div className="relative">
                  {/* Phone Body */}
                  <div className="w-48 sm:w-56 lg:w-64 h-[400px] sm:h-[450px] lg:h-[500px] bg-gray-800 rounded-[2rem] sm:rounded-[2.5rem] shadow-2xl relative overflow-hidden">
                    {/* Screen */}
                    <div className="absolute top-3 left-3 right-3 bottom-3 sm:top-4 sm:left-4 sm:right-4 sm:bottom-4 bg-gray-900 rounded-[1.5rem] sm:rounded-[2rem]"></div>
                    
                    {/* Camera Module */}
                    <div className="absolute top-4 left-4 w-16 h-12 sm:top-6 sm:left-6 sm:w-20 sm:h-16 bg-black rounded-lg sm:rounded-xl">
                      <div className="absolute top-1 left-1 w-2 h-2 sm:top-2 sm:left-2 sm:w-3 sm:h-3 bg-white rounded-full"></div>
                      <div className="absolute top-1 left-5 w-3 h-3 sm:top-2 sm:left-7 sm:w-4 sm:h-4 bg-white rounded-full"></div>
                      <div className="absolute top-1 left-9 w-2 h-2 sm:top-2 sm:left-13 sm:w-3 sm:h-3 bg-white rounded-full"></div>
                    </div>
                    
                    {/* NFC Reading Area */}
                    <div className="absolute top-6 left-6 right-6 h-32 sm:top-8 sm:left-8 sm:right-8 sm:h-40 border-2 sm:border-3 border-yellow-400 border-dashed rounded-lg sm:rounded-xl bg-yellow-400 bg-opacity-10">
                      <div className="absolute -right-8 sm:-right-12 top-12 sm:top-16 w-6 h-0.5 sm:w-8 sm:h-1 bg-yellow-400"></div>
                      <div className="absolute -right-8 sm:-right-12 top-12 sm:top-16 w-1 h-1 sm:w-2 sm:h-2 bg-yellow-400 rounded-full"></div>
                      <div className="absolute -right-2 sm:-right-4 top-12 sm:top-16 w-1 h-1 sm:w-2 sm:h-2 bg-yellow-400 rounded-full"></div>
                    </div>
                    
                    {/* Samsung Logo */}
                    <div className="absolute bottom-16 sm:bottom-24 left-1/2 transform -translate-x-1/2 text-gray-500 text-xs font-semibold">
                      SAMSUNG
                    </div>
                    
                    {/* NFC Icon */}
                    <div className="absolute top-16 sm:top-20 left-1/2 transform -translate-x-1/2 w-6 h-6 sm:w-8 sm:h-8 bg-yellow-400 rounded-full flex items-center justify-center">
                      <span className="text-black text-xs font-bold">NFC</span>
                    </div>
                  </div>
                  
                  {/* NFC Position Label */}
                  <div className="absolute -right-16 sm:-right-20 top-12 sm:top-16 w-36 sm:w-48 p-2 sm:p-3 bg-yellow-100 border-2 border-yellow-400 rounded-lg">
                    <p className="text-xs text-black font-medium">
                      NFC reading area at center/top
                    </p>
                  </div>
                </div>
              </div>

              {/* Android Instructions */}
              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-start gap-2 sm:gap-3">
                  <span className="flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6 bg-black text-white rounded-full flex items-center justify-center text-xs sm:text-sm font-bold">1</span>
                  <p className="text-sm sm:text-base text-gray-700">
                    Tap your phone on the card. Tap around the centre or top of the phone's back.
                  </p>
                </div>
                
                <div className="flex items-start gap-2 sm:gap-3">
                  <span className="flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6 bg-black text-white rounded-full flex items-center justify-center text-xs sm:text-sm font-bold">2</span>
                  <p className="text-sm sm:text-base text-gray-700">
                    Wait for the popup and tap to open your link.
                  </p>
                </div>
                
                <div className="flex items-start gap-2 sm:gap-3">
                  <span className="flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6 bg-black text-white rounded-full flex items-center justify-center text-xs sm:text-sm font-bold">3</span>
                  <p className="text-sm sm:text-base text-gray-700">
                    No popup? Scan the QR code on the card instead.
                  </p>
                </div>
                
                <div className="flex items-start gap-2 sm:gap-3">
                  <span className="flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6 bg-black text-white rounded-full flex items-center justify-center text-xs sm:text-sm font-bold">4</span>
                  <p className="text-sm sm:text-base text-gray-700">
                    Still not working? Turn on NFC. Go to <span className="font-semibold">Settings → Connections / Connected devices → NFC → toggle it ON</span>. You can also swipe down the Quick Settings panel and tap the NFC icon.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* iOS Section */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-lg p-4 sm:p-6 lg:p-8 shadow-sm"
            >
              <h2 className="text-xl sm:text-2xl font-bold text-black mb-4 sm:mb-6 underline">
                FOR iOS
              </h2>
              
              {/* iPhone Illustration */}
              <div className="relative mb-8 flex justify-center">
                <div className="relative">
                  {/* Phone Body */}
                  <div className="w-64 h-[500px] bg-gray-800 rounded-[2.5rem] shadow-2xl relative overflow-hidden">
                    {/* Screen */}
                    <div className="absolute top-4 left-4 right-4 bottom-4 bg-gray-900 rounded-[2rem]"></div>
                    
                    {/* Camera Bump */}
                    <div className="absolute top-4 left-6 w-24 h-20 bg-black rounded-2xl">
                      <div className="absolute top-2 left-2 w-5 h-5 bg-white rounded-full"></div>
                      <div className="absolute top-2 left-9 w-5 h-5 bg-white rounded-full"></div>
                      <div className="absolute top-2 left-16 w-5 h-5 bg-white rounded-full"></div>
                      <div className="absolute top-10 left-2 w-3 h-3 bg-yellow-400 rounded-full"></div>
                    </div>
                    
                    {/* Apple Logo */}
                    <div className="absolute top-32 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-gray-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-lg">🍎</span>
                    </div>
                    
                    {/* NFC Reading Area */}
                    <div className="absolute top-2 left-6 right-6 h-24 border-3 border-blue-400 border-dashed rounded-xl bg-blue-400 bg-opacity-10">
                      <div className="absolute -right-12 top-8 w-8 h-1 bg-blue-400"></div>
                      <div className="absolute -right-12 top-8 w-2 h-2 bg-blue-400 rounded-full"></div>
                      <div className="absolute -right-4 top-8 w-2 h-2 bg-blue-400 rounded-full"></div>
                    </div>
                    
                    {/* NFC Icon */}
                    <div className="absolute top-12 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-blue-400 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-bold">NFC</span>
                    </div>
                  </div>
                  
                  {/* NFC Position Label */}
                  <div className="absolute -right-20 top-8 w-48 p-3 bg-blue-100 border-2 border-blue-400 rounded-lg">
                    <p className="text-xs text-black font-medium">
                      NFC reading area at top (iPhone XR+)
                    </p>
                  </div>
                </div>
              </div>

              {/* iOS Instructions */}
              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-start gap-2 sm:gap-3">
                  <span className="flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6 bg-black text-white rounded-full flex items-center justify-center text-xs sm:text-sm font-bold">1</span>
                  <p className="text-sm sm:text-base text-gray-700">
                    Tap your phone on the card. Tap near the top of the phone's back.
                  </p>
                </div>
                
                <div className="flex items-start gap-2 sm:gap-3">
                  <span className="flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6 bg-black text-white rounded-full flex items-center justify-center text-xs sm:text-sm font-bold">2</span>
                  <p className="text-sm sm:text-base text-gray-700">
                    Wait for the popup and tap to open your link.
                  </p>
                </div>
                
                <div className="flex items-start gap-2 sm:gap-3">
                  <span className="flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6 bg-black text-white rounded-full flex items-center justify-center text-xs sm:text-sm font-bold">3</span>
                  <p className="text-sm sm:text-base text-gray-700">
                    No popup? Scan the QR code on the card instead.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Additional Info Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-8 sm:mt-12 bg-white rounded-lg p-4 sm:p-6 lg:p-8 shadow-sm"
          >
            <h2 className="text-xl sm:text-2xl font-bold text-black mb-4 sm:mb-6">
              About ARK NFC Cards
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              <div>
                <h3 className="text-base sm:text-lg font-semibold text-black mb-2 sm:mb-3">Features</h3>
                <ul className="space-y-1 sm:space-y-2 text-sm sm:text-base text-gray-700">
                  <li>• Contactless NFC technology</li>
                  <li>• QR code backup option</li>
                  <li>• Works with Android and iOS</li>
                  <li>• Premium card design</li>
                  <li>• Instant link sharing</li>
                </ul>
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-semibold text-black mb-2 sm:mb-3">Compatibility</h3>
                <ul className="space-y-1 sm:space-y-2 text-sm sm:text-base text-gray-700">
                  <li>• Android 4.0+ with NFC</li>
                  <li>• iOS 11+ (iPhone XR and above)</li>
                  <li>• Most modern smartphones</li>
                  <li>• NFC-enabled devices</li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Info;