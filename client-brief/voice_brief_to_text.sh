#!/bin/bash

###############################################################################
# PURPOSE
#
# Find every moment in an earnings call video where the speaker says
# "quarterly results", then automatically create separate video clips
# around those moments.
#
# REQUIREMENTS
# - ffmpeg
# - Whisper (OpenAI Whisper CLI or compatible implementation)
# - jq
#
# INPUT FILE
# earnings_call.mp4
###############################################################################


###############################################################################
# STEP 1: EXTRACT AUDIO FROM THE VIDEO
#
# ffmpeg:
#   A powerful multimedia tool for converting, editing, and processing
#   audio/video files.
#
# Options:
#   -i example.mp4     -> input file
#   -vn                      -> disable video output
#   -acodec pcm_s16le        -> save audio as uncompressed WAV
#
# Output:
#   audio.wav
###############################################################################

ffmpeg -i voice-brief.m4a -vn -acodec pcm_s16le voice-brief.wav


###############################################################################
# STEP 2: TRANSCRIBE THE AUDIO WITH TIMESTAMPS
#
# Whisper:
#   Speech-to-text model that converts audio into text.
#
# Options:
#   --model medium
#       Uses the "medium" Whisper model.
#
#   --output_format json
#       Produces JSON output that includes timestamps and segments.
#
# Output:
#   transcript.json
###############################################################################

whisper voice-brief.wav \
    --model medium \
    --output_format json \
    > transcript.json
