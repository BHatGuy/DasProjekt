TSC=tsc
CLIENT_DIR=client
SERVER_DIR=server
BUILD_DIR=build
TS_FILES := $(wildcard $(CLIENT_DIR)/*.ts)
JS_FILES := $(patsubst $(CLIENT_DIR)/%.ts,$(BUILD_DIR)/%.js,$(TS_FILES))


client: $(JS_FILES) $(BUILD_DIR)/index.html $(BUILD_DIR)/styles.css tsconfig.json

$(BUILD_DIR)/%.js: $(TS_FILES)
	$(TSC)
$(BUILD_DIR)/styles.css: $(CLIENT_DIR)/styles.css
	cp $< $@
$(BUILD_DIR)/index.html: $(CLIENT_DIR)/index.html
	cp $< $@
	
client-serve: client
	python -m http.server --directory $(BUILD_DIR) 

clean:
	rm -r $(BUILD_DIR)

server: $(SERVER_DIR)/server.py 
	python $(SERVER_DIR)/server.py 

.PHONY: client client-serve clean